import React from "react";
import { redirect } from "next/navigation";
import { TodoModel } from "@/lib/models";
import { deleteTodo } from "@/data/actions";
import Link from "next/link";
import styles from "./page.module.scss";

const getTodo = async ({ _id }: { _id: string }) => {
  try {
    const todo = await TodoModel.findById(_id);
    return todo;
  } catch (error: any) {
    return null;
  }
};

const DeleteButton = () => {
  return (
    <button id={styles.delete} type="submit">
      Delete
    </button>
  );
};

const TodoId = async ({ params }: { params: { todoId: string } }) => {
  const { todoId } = params;

  const todo = await getTodo({ _id: todoId });

  if (!todo) return redirect("/todo");

  return (
    <div className={styles["todo-item-wrapper"]}>
      <div className={styles.left}>
        <h3>{todo.title}</h3>
      </div>
      <div className={styles.right}>
        <Link href={`/todo/edit/${todoId}`}>
          <button>Edit</button>
        </Link>

        <Link href="/todo">
          <button>Go back</button>
        </Link>

        <form action={deleteTodo}>
          <input type="hidden" name="todoId" value={todoId} />
          <DeleteButton />
        </form>
      </div>
    </div>
  );
};

export default TodoId;
