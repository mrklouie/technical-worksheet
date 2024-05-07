import React from "react";
import { Todo } from "..";
import styles from "./TodoListContainer.module.scss";
import { getTodos } from "@/lib/getTodos";

const Lists = async () => {
  const todos = await getTodos();

  return (
    <ul>
      {todos.map((todo, index) => (
        <Todo
          key={index}
          id={todo._id.toString()}
          title={todo.title}
          isDone={todo.isDone}
        />
      ))}
    </ul>
  );
};

const TodoListContainer = async () => {
  return (
    <div>
      <div className={styles["todo-lists"]}>
        <Lists />
      </div>
    </div>
  );
};

export default TodoListContainer;
