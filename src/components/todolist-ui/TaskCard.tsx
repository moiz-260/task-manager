import { Pencil, Trash2 } from "lucide-react";
import { Task } from "@/src/types/task.type";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export const TaskCard = ({ task, onEdit, onDelete }: TaskCardProps) => {
  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded p-6">
      <h2 className="text-xl font-semibold mb-3 text-center">{task.title}</h2>
      <p className="text-zinc-400 mb-4 text-center">{task.description}</p>
      <div className="flex gap-3 justify-center">
        <button
          onClick={() => onEdit(task)}
          className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors"
        >
          <Pencil size={18} />
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="flex items-center gap-2 text-zinc-300 hover:text-red-400 transition-colors"
        >
          <Trash2 size={18} />
          Delete
        </button>
      </div>
    </div>
  );
};
