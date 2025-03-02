export interface Task {
  id?: number;
  title: string;
  description: string;
  done: boolean;
}

export interface TasksPaginated {
  tasks: Task[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}
