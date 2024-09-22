import { tasks } from "../../data/tasks";
import { Task } from "../../../../types/Task";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const taskId = Number(params.id);
  if (isNaN(taskId)) {
    return new Response("Invalid task id", { status: 400 });
  }

  const taskIndex = tasks.findIndex((task: Task) => task.id === taskId);
  if (taskIndex === -1) {
    return new Response("Task not found", { status: 404 });
  }

  const body: Partial<Task> = await req.json();
  tasks[taskIndex] = { ...tasks[taskIndex], ...body };

  return new Response(JSON.stringify(tasks[taskIndex]), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  const taskId = Number(params.id);

  if (isNaN(taskId)) {
    return new Response("Invalid task id", { status: 400 });
  }

  const taskIndex = tasks.findIndex((task: Task) => task.id === taskId);

  if (taskIndex === -1) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  tasks.splice(taskIndex, 1);
  return NextResponse.json({ message: "Task deleted successfully" });
}
