"use client"
import { useState, useEffect } from "react";
import { supabase } from "@/src/libs/supabase-client/supabaseClient";
import { Task, TaskFormData } from "@/src/types/task.type";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all tasks
  const fetchTasks = async () => {
    setLoading(true);
    setError(null);

    const { data, error: fetchError } = await supabase
      .from("tasks")
      .select("*")
      .order("id", { ascending: false });

    if (fetchError) {
      console.error("Error fetching tasks:", fetchError);
      setError(fetchError.message);
      setLoading(false);
      return;
    }

    setTasks(data || []);
    setLoading(false);
  };

  // Add new task
  const addTask = async (taskData: TaskFormData): Promise<boolean> => {
    setError(null);

    const { data, error: insertError } = await supabase
      .from("tasks")
      .insert(taskData)
      .select()
      .single();

    if (insertError) {
      console.error("Error adding task:", insertError);
      setError(insertError.message);
      return false;
    }

    if (data) {
      setTasks((prev) => [data, ...prev]);
    }
    return true;
  };

  // Update task
  const updateTask = async (
    id: number,
    taskData: TaskFormData
  ): Promise<boolean> => {
    setError(null);

    const { error: updateError } = await supabase
      .from("tasks")
      .update(taskData)
      .eq("id", id);

    if (updateError) {
      console.error("Error updating task:", updateError);
      setError(updateError.message);
      return false;
    }

    // Update local state
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...taskData } : task))
    );
    return true;
  };

  // Delete task
  const deleteTask = async (id: number): Promise<boolean> => {
    setError(null);

    const { error: deleteError } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("Error deleting task:", deleteError);
      setError(deleteError.message);
      return false;
    }

    setTasks((prev) => prev.filter((task) => task.id !== id));
    return true;
  };

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
    refreshTasks: fetchTasks,
  };
};
