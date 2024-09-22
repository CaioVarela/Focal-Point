//Fake data
//TODO:Create a database to persist tasks

export let tasks = [
  { id: 1, name: "Lavar as mãos", completed: false },
  { id: 2, name: "Fazer um bolo", completed: false },
  { id: 3, name: "Lavar a Louça", completed: false },
  { id: 4, name: "Levar o lixo para fora", completed: true },
];

export function updateTasks(newTasks) {
  tasks = newTasks;
}
