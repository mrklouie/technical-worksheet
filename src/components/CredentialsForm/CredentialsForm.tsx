"use client";

import React, { useState } from "react";
import styles from "./CredentialsForm.module.scss";
import { login } from "@/data/actions";
import { FormAlert, RegisterForm } from "..";
import { useFormState, useFormStatus } from "react-dom";
import Image from "next/image";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} type="submit">
      Sign In
    </button>
  );
};

function CredentialsForm() {
  const [register, setRegister] = useState(false);
  const [formMessage, formAction] = useFormState(login, null);

  const handleRegisterClick = () => {
    setRegister((prevState) => !prevState);
  };

  return (
    <div className={styles["form-wrapper"]}>
      <h1 id={styles["login-title"]}>
        {register ? "Register here" : "Todo Login Page"}
      </h1>
      <Image
        src="/login.png"
        width={0}
        height={0}
        alt="login page"
        sizes="100vw"
      />
      {register ? (
        <RegisterForm />
      ) : (
        <form action={formAction}>
          <input type="email" name="email" placeholder="sample@gmail.com" />
          <input type="password" name="password" placeholder="Enter password" />
          <SubmitButton />
        </form>
      )}

      {formMessage && (
        <FormAlert
          alertType={formMessage.alertType}
          alertMessage={formMessage.alertText}
        />
      )}
      <span onClick={handleRegisterClick} id={styles["register-cta"]}>
        {register
          ? "Already have an account? Login here"
          : "Don't have an account? Sign Up here"}
      </span>
    </div>
  );
}

export default CredentialsForm;
