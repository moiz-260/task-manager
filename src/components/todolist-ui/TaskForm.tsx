import { useState, useEffect, FormEvent } from "react";
import { Task, TaskFormData } from "@/src/types/task.type";

interface TaskFormProps {
  editingTask: Task | null;
  onSubmit: (data: TaskFormData) => Promise<boolean>;
  onCancel: () => void;
}

export const TaskForm = ({
  editingTask,
  onSubmit,
  onCancel,
}: TaskFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editingTask]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    const success = await onSubmit({ title, description });

    if (success) {
      setTitle("");
      setDescription("");
      if (editingTask) {
        onCancel();
      }
    }
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    onCancel();
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-3 mb-4 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
          required
        />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-3 mb-4 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 resize-none"
          rows={3}
        />
        <div className="flex gap-2 justify-center">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded transition-colors"
          >
            {editingTask ? "Update Task" : "Add Task"}
          </button>
          {editingTask && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-zinc-700 hover:bg-zinc-600 text-white px-6 py-2 rounded transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
