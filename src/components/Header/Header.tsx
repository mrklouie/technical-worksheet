import React from "react";
import styles from "./Header.module.scss";
import Image from "next/image";

const Header = () => {
  return (
    <header className={styles["header-container"]}>
      <div className={styles["header-container__wrapper"]}>
        <div className={styles["header-container__contents"]}>
          <Image
            sizes="100vw"
            width={0}
            height={0}
            src="/pokemon_logo.png"
            alt="pokemon logo"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
