import React from "react";
import styles from "./page.module.scss";
import Link from "next/link";

const ProjectList = () => {
  const activities = [
    {
      title: "Activity 1: Centered Text",
      path: "/center",
    },
    {
      title: "Activity 2: Counter App",
      path: "/counter",
    },
    {
      title: "Activity3 : Simple Calculator",
      path: "/calculator",
    },
    {
      title: "Activity 4: Button",
      path: "/button",
    },
    {
      title:
        "Activity 5 & 6: Todo App (Created using NextJS, Auth.JS and MongoDB)",
      path: "/todo",
    },
    {
      title: "Activity 7: Poke API Cards",
      path: "/pokeapi",
    },
  ];

  return (
    <>
      <ul>
        {activities.map((activity, index) => {
          return (
            <li key={index}>
              <Link href={activity.path}>{activity.title}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

const page = () => {
  return (
    <div className={styles["technical-worksheet-main-container"]}>
      <div className={styles.header}>
        <h1>Technical Worksheet Projects</h1>
      </div>

      <div className={styles.body}>
        <ProjectList />
      </div>
    </div>
  );
};

export default page;
