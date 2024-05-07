"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.scss";

const CheckNum = ({ counter }: { counter: number }) => {
  return (
    <h3>
      {counter % 2 === 0
        ? `${counter} Is an even number`
        : `${counter} Is an odd number`}
    </h3>
  );
};

const CounterPage = () => {
  const [counter, setCounter] = useState(0);

  const increment = () => {
    setCounter((prevState) => prevState + 1);
  };
  const decrement = () => {
    if (counter <= 0) return;
    setCounter((prevState) => prevState - 1);
  };

  console.log(counter);

  return (
    <div className={styles["counter-container"]}>
      <div className={styles.contents}>
        <h1> {counter}</h1>

        <button onClick={increment}>Increment +</button>
        <button onClick={decrement}>Decrement -</button>

        <CheckNum counter={counter} />
      </div>
    </div>
  );
};

export default CounterPage;
