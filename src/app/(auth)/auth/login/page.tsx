import React from "react";
import { CredentialsForm } from "@/components";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import styles from "./page.module.scss";

const LoginPage = async () => {
  const session = await auth();

  if (session) return redirect("/todo");

  return (
    <div className={styles["login-container"]}>
      <CredentialsForm />
    </div>
  );
};

export default LoginPage;
