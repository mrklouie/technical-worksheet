import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide an email"],
    validate: {
      validator: validator.isEmail,
      message: "Please enter a valid email address",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
});

const TodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Please provide user"],
    },

    isDone: {
      default: false,
      type: Boolean,
    },
  },
  { timestamps: true }
);

export const TodoModel =
  mongoose.models?.Todo || mongoose.model("Todo", TodoSchema);

export const UserModel =
  mongoose.models?.User || mongoose.model("User", UserSchema);
