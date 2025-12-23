import { Task } from "@/src/types/task.type";
import { TaskCard } from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export const TaskList = ({ tasks, onEdit, onDelete }: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center text-zinc-500 mt-12">
        No tasks yet. Add your first task above!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
