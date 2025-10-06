"use client";

import { useEffect, useState, ChangeEvent } from "react";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");

  const fetchTodos = async (): Promise<void> => {
    try {
      const res = await fetch("/api/todos");
      if (!res.ok) throw new Error("Failed to fetch todos");
      const data: Todo[] = await res.json();
      setTodos(data);
    } catch (err) {
      console.error(err);
    }
  };

  const addTodo = async (): Promise<void> => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    try {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: trimmedTitle }),
      });
      if (!res.ok) throw new Error("Failed to add todo");
      setTitle("");
      await fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    void fetchTodos();
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <h1 className="text-xl font-bold">My Todos</h1>

      <div className="flex gap-2">
        <input
          value={title}
          onChange={handleChange}
          placeholder="New todo"
          className="border p-2 flex-1 rounded"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-4 rounded"
          type="button"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {todos.map((t) => (
          <li key={t.id} className="border p-2 rounded">
            {t.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
