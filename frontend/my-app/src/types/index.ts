export enum TaskStatus {
  Todo = "TODO",
  InProgress = "IN_PROGRESS",
  Completed = "COMPLETED",
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  deadline: string;
  userId: number;
}

export interface TaskColumnProps {
  title: string;
  tasks: Task[];
  onDrop: (task: Task, newStatus: Task["status"]) => void;
}
