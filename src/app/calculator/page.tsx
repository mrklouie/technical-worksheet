"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.scss";

const CalculatorPage = () => {
  const [inputs, setInputs] = useState({ firstNum: "", secondNum: "" });

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const calculate = () => {
    return Number(inputs.firstNum) + Number(inputs.secondNum);
  };

  return (
    <div className={styles["calculator-container"]}>
      <h1>Calculator App</h1>
      <input
        value={inputs.firstNum}
        onChange={handleInputChange}
        type="number"
        name="firstNum"
        placeholder="Enter first number"
      />
      <input
        value={inputs.secondNum}
        onChange={handleInputChange}
        type="number"
        name="secondNum"
        placeholder="Enter second number"
      />

      <h3 className={styles.answer}>Answer: {calculate()}</h3>
    </div>
  );
};

export default CalculatorPage;
