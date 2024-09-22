"use client";

import React, { useState } from "react";
import Button from "../button/button";
import styles from "./addTaskModal.module.scss";

interface AddTaskModalProps {
  closeModal: () => void;
  addTask: (taskName: string) => void;
}

export default function AddTaskModal({
  closeModal,
  addTask,
}: AddTaskModalProps) {
  const [taskName, setTaskName] = useState("");

  const handleAddTask = () => {
    addTask(taskName);
  };

  return (
    <div className={styles.addTaskModalContainer}>
      <div className={styles.taskModal}>
        <h1 className={styles.titleText}>Nova tarefa</h1>
        <div className={styles.inputContainer}>
          <span className={styles.inputTitleText}>Título</span>
          <div style={{ width: "92%" }}>
            <input
              className={styles.input}
              placeholder="Digite"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Button
            buttonText="Cancelar"
            variant="CancelButton"
            onClick={closeModal}
          />{" "}
          <Button
            buttonText="Adicionar"
            variant="ConfirmationButton"
            onClick={handleAddTask}
          />{" "}
        </div>
      </div>
      <div className={styles.overlay} onClick={closeModal} />{" "}
    </div>
  );
}
