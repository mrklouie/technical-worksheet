import React from "react";
import styles from "./Card.module.scss";
import Image from "next/image";

const Card = ({
  pokemon_id,
  pokemon_avatar,
  pokemon_name,
  pokemon_desc,
}: TPokemonType) => {
  return (
    <div className={styles["card-item-wrapper"]}>
      <div className={styles.header}>
        <span>#{pokemon_id}</span>
      </div>
      <div className={styles.avatar}>
        <Image
          alt="mewtwo"
          sizes="100vw"
          height={0}
          width={0}
          src={pokemon_avatar}
        />
      </div>

      <div className={styles.footer}>
        <h3 id={styles["pokemon-name"]}>{pokemon_name}</h3>
        <p className={styles["pokemon-desc"]}>{pokemon_desc}</p>
      </div>
    </div>
  );
};

export default Card;
