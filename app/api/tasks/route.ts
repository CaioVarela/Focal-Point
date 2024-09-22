import { tasks, updateTasks } from "../data/tasks";
import { Task } from "../../../types/Task";

export async function GET() {
  return new Response(JSON.stringify(tasks), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: Request) {
  const body: Partial<Task> = await req.json();

  if (!body.name) {
    return new Response("Task name is required", { status: 400 });
  }

  const newTask: Task = {
    id: tasks.length + 10,
    name: body.name,
    completed: false,
  };

  tasks.push(newTask);

  return new Response(JSON.stringify(newTask), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
