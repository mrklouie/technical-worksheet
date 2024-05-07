import { revalidatePath } from "next/cache";
import { connectDB } from "./connectDB";
import { UserModel, TodoModel } from "./models";
import { auth } from "@/auth";

export const getTodos = async () => {
  try {
    await connectDB();
    const session = await auth();

    const user = await UserModel.findOne({ email: session?.user?.email });

    const todo = await TodoModel.find({ createdBy: user._id });

    revalidatePath("/todo");
    return todo;
  } catch (error: any) {
    throw new Error(error.message || error);
  }
};
