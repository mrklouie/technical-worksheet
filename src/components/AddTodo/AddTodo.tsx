"use client";

import { useFormState, useFormStatus } from "react-dom";
import { addTodo } from "@/data/actions";
import FormAlert from "../FormAlert/FormAlert";
import { useEffect, useRef } from "react";
import styles from "./AddTodo.module.scss";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit">
      Add Todo
    </button>
  );
};

const AddTodo = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [formMessage, formAction] = useFormState(addTodo, null);

  useEffect(() => {
    if (formMessage?.alertType !== "success") return;

    formRef?.current?.reset();
  }, [formMessage]);

  return (
    <div className={styles["add-todo-container"]}>
      {formMessage && (
        <FormAlert
          alertType={formMessage.alertType}
          alertMessage={formMessage.alertText}
        />
      )}
      <form ref={formRef} action={formAction}>
        <input type="text" name="todoTitle" placeholder="Enter todo title" />
        <SubmitButton />
      </form>
    </div>
  );
};

export default AddTodo;
