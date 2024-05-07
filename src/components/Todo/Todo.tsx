"use client";

import React, { useEffect } from "react";
import styles from "./Todo.module.scss";
import { deleteTodo } from "@/data/actions";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { useStore } from "@/store";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit">
      Delete
    </button>
  );
};

const Todo = ({
  title,
  isDone,
  id,
}: {
  title: string;
  isDone: boolean;
  id: string;
}) => {
  const { isViewMode, disableViewMode, enableViewMode } = useStore((state) => ({
    isViewMode: state.isViewMode,
    disableViewMode: state.disableViewMode,
    enableViewMode: state.enableViewMode,
  }));

  return (
    <li className={styles["todo-wrapper"]}>
      <div className={styles.left}>
        <h3>{title}</h3>
      </div>
      <div className={styles.right}>
        <Link href={`/todo/${id}`}>
          <button>View</button>
        </Link>

        <form action={deleteTodo}>
          <input type="hidden" name="todoId" value={id} />
          <SubmitButton />
        </form>
      </div>
    </li>
  );
};

export default Todo;
