export interface Task {
  id: number;
  title: string;
  description: string;
  created_at?: string;
}

export interface TaskFormData {
  title: string;
  description: string;
}
