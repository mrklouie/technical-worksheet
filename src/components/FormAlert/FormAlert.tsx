import React from "react";
import styles from "./FormAlert.module.scss";

const FormAlert = ({ alertType, alertMessage }: TAlert) => {
  return (
    <div className={styles["form-alert-container"]}>
      <div className={styles["form-alert-container__contents"]}>
        <div
          className={`${
            alertType === "danger" ? styles.danger : styles.success
          }`}
          id={styles["alert-message"]}
        >
          {alertMessage}
        </div>
      </div>
    </div>
  );
};

export default FormAlert;
