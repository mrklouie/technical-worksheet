"use server";

import { connectDB } from "@/lib/connectDB";
import { TodoModel, UserModel } from "@/lib/models";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const editTodo = async (prevState: unknown, formData: FormData) => {
  const { todoTitle, todoId } = Object.fromEntries(formData);

  const isLoggedIn = await auth();

  if (!isLoggedIn) return redirect("/auth/login");

  try {
    await connectDB();
    const todo = await TodoModel.findByIdAndUpdate(todoId, {
      title: todoTitle,
    });
  } catch (error: any) {
    return {
      alertType: "danger",
      alertText: error.message || "Something went wrong",
    };
  }

  revalidatePath("/todo");
  redirect(`/todo/${todoId}`);
};

export const addTodo = async (prevState: unknown, formData: FormData) => {
  const { todoTitle } = Object.fromEntries(formData);

  const isLoggedIn = await auth();

  if (!isLoggedIn) return redirect("/auth/login");

  try {
    await connectDB();

    if (!todoTitle)
      return {
        alertType: "danger",
        alertText: "Please provide a title",
      };

    const session = await auth();
    const user = await UserModel.findOne({ email: session?.user?.email });
    const todo = await TodoModel.create({
      title: todoTitle,
      createdBy: user._id,
    });
  } catch (error: any) {
    return {
      alertText: error.message || "Something went wrong",
      alertType: "danger",
    };
  }

  revalidatePath("/todo");
  redirect("/todo");
};

export const deleteTodo = async (formData: FormData) => {
  const { todoId } = Object.fromEntries(formData);

  const isLoggedIn = await auth();

  if (!isLoggedIn) return redirect("/auth/login");

  await TodoModel.findByIdAndDelete({ _id: todoId });

  revalidatePath("/todo");
};

export const register = async (prevState: unknown, formData: FormData) => {
  const { email, password, cpassword } = Object.fromEntries(formData);

  if (!email || !password || !cpassword) {
    return {
      alertType: "danger",
      alertMessage: "Please fill out all required fields",
    };
  }

  if (cpassword !== password) {
    return {
      alertType: "danger",
      alertMessage: "Password do not match",
    };
  }

  try {
    await connectDB();

    // We hash the password before creating the user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password.toString(), salt);

    let user = await UserModel.findOne({ email });

    if (user)
      return {
        alertType: "danger",
        alertMessage: "Email already exist",
      };

    user = await UserModel.create({ email, password: hashedPassword });

    return {
      alertType: "success",
      alertMessage: "User Created",
    };
  } catch (error: any) {
    return {
      alertType: "danger",
      alertMessage: error.message || "Something went wrong",
    };
  }
};

export const login = async (prevState: unknown, formData: FormData) => {
  const { email, password } = Object.fromEntries(formData);

  if (!email || !password)
    return {
      alertType: "danger",
      alertText: "Please fill out all required fields",
    };
  try {
    await connectDB();
    // We use the credentials method for this one since-
    // we are using email and password as the authentication

    // We pass the email, password and redirectTo() as the options
    // email => email input from the form
    // password => password input from the form
    // redirectTo => a link/path to redirect the user when he/she
    // are authorized to sign in or if they authenticated successfully

    const user = await UserModel.findOne({ email });

    if (!user) {
      return {
        alertType: "danger",
        alertText: "Invalid Credentials",
      };
    }

    const isMatch = await bcrypt.compare(password.toString(), user.password);

    if (!isMatch)
      return {
        alertType: "danger",
        alertText: "Invalid Credentials",
      };

    await signIn("credentials", {
      email,
      password,
      redirectTo: "/todo",
    });
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          console.log("Invalid Credentials");

          return {
            alertType: "danger",
            alertText: "Invalid Credentials",
          };

        case "AccessDenied":
          console.log("Access Denied");

          return {
            alertType: "danger",
            alertText: "Invalid Credentials",
          };

        default:
          console.log("Something went wrong");

          return {
            alertType: "danger",
            alertText: "Something went wrong",
          };
      }
    }
    // We 'MUST' throw the 'ERROR' back or else the redirection will not work
    throw error;
  }
};
