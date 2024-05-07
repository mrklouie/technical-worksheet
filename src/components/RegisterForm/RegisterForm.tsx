"use client";

import React from "react";
import { register } from "@/data/actions";
import { useFormState, useFormStatus } from "react-dom";
import { FormAlert } from "..";
import styles from "./RegisterForm.module.scss";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit">
      Sign Up
    </button>
  );
};

const RegisterForm = () => {
  const [formMessage, formAction] = useFormState(register, null);

  return (
    <div>
      <form className={styles["register-form"]} action={formAction}>
        <input type="email" name="email" placeholder="sample@gmail.com" />
        <input type="password" name="password" placeholder="Enter password" />
        <input
          type="password"
          name="cpassword"
          placeholder="Confirm Password"
        />
        <SubmitButton />
      </form>

      {formMessage && (
        <FormAlert
          alertType={formMessage.alertType}
          alertMessage={formMessage.alertMessage}
        />
      )}
    </div>
  );
};

export default RegisterForm;
