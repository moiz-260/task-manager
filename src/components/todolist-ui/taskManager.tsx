"use client";
import { useState } from "react";
import { Task, TaskFormData } from "@/src/types/task.type";
import { useTasks } from "@/src/hooks/useTask";
import { TaskForm } from "./TaskForm";
import { TaskList } from "./TaskList";

export default function TaskManager() {
  const { tasks, loading, error, addTask, updateTask, deleteTask } = useTasks();
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleFormSubmit = async (data: TaskFormData): Promise<boolean> => {
    if (editingTask) {
      return await updateTask(editingTask.id, data);
    } else {
      return await addTask(data);
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
  };

  const handleCancel = () => {
    setEditingTask(null);
  };

  const handleDelete = async (id: number) => {
    await deleteTask(id);
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-semibold text-center mb-8">
          Task Manager CRUD
        </h1>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 rounded p-3 mb-4 text-center">
            {error}
          </div>
        )}

        <TaskForm
          editingTask={editingTask}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
        />

        {loading ? (
          <div className="text-center text-zinc-500 mt-12">
            Loading tasks...
          </div>
        ) : (
          <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
}
