"use client";

import React, { useEffect, useState } from "react";
import Button from "../button/button";
import TaskItem from "../task/taskItem";
import AddTaskModal from "../addTaskModal/addTaskModal";
import DeleteTaskModal from "../deleteTaskModal/deleteTaskModal";
import style from "./taskContainer.module.scss";
import { Task } from "../../../types/Task";

export default function TaskContainer() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data: Task[]) => setTasks(data));
  }, []);

  const openAddTaskModal = () => {
    setIsAddTaskModalOpen(true);
  };

  const closeAddTaskModal = () => {
    setIsAddTaskModalOpen(false);
  };

  const openDeleteTaskModal = (taskId: number) => {
    setTaskToDelete(taskId);
    setIsDeleteTaskModalOpen(true);
  };

  const closeDeleteTaskModal = () => {
    setTaskToDelete(null);
    setIsDeleteTaskModalOpen(false);
  };

  const addTask = async (taskName: string) => {
    if (taskName) {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: taskName }),
      });
      const newTask: Task = await res.json();
      setTasks((prevTasks) => [...prevTasks, newTask]);
      closeAddTaskModal();
    }
  };

  const confirmDeleteTask = async () => {
    if (taskToDelete !== null) {
      await fetch(`/api/tasks/${taskToDelete}`, {
        method: "DELETE",
      });
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== taskToDelete),
      );
      closeDeleteTaskModal();
    }
  };

  const toggleTaskCompletion = async (taskId: number, completed: boolean) => {
    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed }),
      });

      if (res.ok) {
        const updatedTask: Task = await res.json();
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === taskId ? updatedTask : task)),
        );
      }
    } catch (error) {
      console.error("Erro ao atualizar a tarefa:", error);
    }
  };

  return (
    <div>
      <div className={style.tasksContainer}>
        <div className={style.tasksBox}>
          {tasks.some((task) => !task.completed) && (
            <>
              <span className={style.taskHeader}>Suas tarefas de hoje</span>
              {tasks
                .filter((task) => !task.completed)
                .map((task) => (
                  <TaskItem
                    key={task.id}
                    option={task}
                    deleteTask={() => openDeleteTaskModal(task.id)}
                    toggleTaskCompletion={toggleTaskCompletion}
                  />
                ))}
            </>
          )}

          {tasks.some((task) => task.completed) && (
            <>
              <span className={style.taskHeader}>Tarefas finalizadas</span>
              {tasks
                .filter((task) => task.completed)
                .map((task) => (
                  <TaskItem
                    key={task.id}
                    option={task}
                    deleteTask={() => openDeleteTaskModal(task.id)}
                    toggleTaskCompletion={toggleTaskCompletion}
                  />
                ))}
            </>
          )}
        </div>

        {isAddTaskModalOpen && (
          <AddTaskModal closeModal={closeAddTaskModal} addTask={addTask} />
        )}
        {isDeleteTaskModalOpen && (
          <DeleteTaskModal
            closeModal={closeDeleteTaskModal}
            confirmDelete={confirmDeleteTask}
          />
        )}
      </div>
      <div className={style.buttonContainer}>
        <div className={style.addTaskButton}>
          <Button
            buttonText="Adicionar nova tarefa"
            variant="AddButton"
            onClick={openAddTaskModal}
          />
        </div>
      </div>
    </div>
  );
}
