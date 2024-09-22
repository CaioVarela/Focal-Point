import React from "react";
import Header from "./components/header/header";
import TaskContainer from "./components/taskContainer/taskContainer";

export default function Page() {
  return (
    <div>
      <Header />
      <TaskContainer />
    </div>
  );
}
