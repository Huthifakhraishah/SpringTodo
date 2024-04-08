export enum TaskStatus {
  Todo = "TODO",
  InProgress = "IN PROGRESS",
  Completed = "COMPLETED",
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  deadline: string;
}

export interface TaskColumnProps {
  title: string;
  tasks: Task[];
  onDrop: (task: Task, newStatus: Task["status"]) => void;
}
