"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.scss";

const ButtonPage = () => {
  const [btnSize, setBtnSize] = useState(1);
  const [colorIndex, setColorIndex] = useState(0);

  const colors = ["#1e232c", "#47B7DC", "#57F287", "#F0D731"];

  const btnStyle = {
    fontSize: `${btnSize}rem`,
    backgroundColor: colors[colorIndex],
  };

  const handleClick = () => {
    if (btnSize * 2 <= 16) {
      setBtnSize((prevState) => prevState * 2);
    } else {
      setBtnSize(1);
    }

    setColorIndex(Math.floor(Math.random() * colors.length));
  };

  useEffect(() => {
    console.log({ btnSize, colorIndex });
  }, [btnSize, colorIndex]);

  return (
    <div className={styles["button-page-container"]}>
      <button style={btnStyle} onClick={handleClick}>
        GROW
      </button>
    </div>
  );
};

export default ButtonPage;
