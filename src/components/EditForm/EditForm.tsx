"use client";

import React, { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import { editTodo } from "@/data/actions";
import { FormAlert } from "..";
import styles from "./EditForm.module.scss";

type TTodoData = {
  id: string;
  title: string;
  isDone: boolean;
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} type="submit">
      Save Changes
    </button>
  );
};

const EditForm = ({ id, title, isDone }: TTodoData) => {
  const [formMessage, formAction] = useFormState(editTodo, null);
  const [todoTitle, setTodoTitle] = useState(title);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTodoTitle(e.currentTarget.value);
  };

  return (
    <>
      <form className={styles["form-wrapper"]} action={formAction}>
        <input type="hidden" name="todoId" value={id} />
        <input
          value={todoTitle}
          onChange={handleChange}
          type="text"
          name="todoTitle"
          placeholder="New todo title"
        />
        <SubmitButton />
      </form>
      {formMessage && (
        <FormAlert
          alertType={formMessage.alertType}
          alertMessage={formMessage.alertText}
        />
      )}
      <Link id={styles.back} href={`/todo/${id}`}>
        Go back
      </Link>
    </>
  );
};

export default EditForm;
