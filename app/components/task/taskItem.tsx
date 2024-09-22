"use client";

import React from "react";
import Image from "next/image";
import style from "./taskItem.module.scss";
import trashIcon from "../../../public/trashIcon.svg";

interface TaskItemProps {
  option: { id: number; name: string; completed: boolean };
  deleteTask: (taskId: number) => void;
  toggleTaskCompletion: (taskId: number, completed: boolean) => void;
}

export default function TaskItem({
  option,
  deleteTask,
  toggleTaskCompletion,
}: TaskItemProps) {
  const handleDelete = () => {
    deleteTask(option.id);
  };

  const handleToggleCompletion = () => {
    toggleTaskCompletion(option.id, option.completed);
  };

  return (
    <div className={style.taskItem}>
      <div
        style={{
          paddingLeft: "10px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <input
          type="checkbox"
          checked={option.completed}
          onChange={handleToggleCompletion}
        />
        <span
          className={`${style.taskItemText} ${
            option.completed ? style.completed : ""
          }`}
        >
          {option.name}
        </span>
      </div>
      <Image
        className={style.trashIcon}
        src={trashIcon}
        alt="trash"
        onClick={handleDelete}
      />
    </div>
  );
}
