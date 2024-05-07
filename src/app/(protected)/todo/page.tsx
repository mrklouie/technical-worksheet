import React from "react";
import { TodoListContainer } from "@/components";
import styles from "./page.module.scss";

const TodoPage = async () => {
  return (
    <div className={styles["todo-list-main-container"]}>
      <TodoListContainer />
    </div>
  );
};

export default TodoPage;
