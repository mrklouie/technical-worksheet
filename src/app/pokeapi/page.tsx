import React from "react";
import styles from "./page.module.scss";
import { Header, CardsContaainer } from "@/components";

const PokeAPIPage = () => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles["main-contents"]}>
        <CardsContaainer />
      </main>
    </div>
  );
};

export default PokeAPIPage;
