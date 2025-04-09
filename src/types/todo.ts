export type Priority = 'low' | 'medium' | 'high';

export type Category = 'work' | 'personal' | 'shopping' | 'health' | 'other';

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: Priority;
  category: Category;
  dueDate: string;
  createdAt: string;
}

export interface TodoState {
  todos: Todo[];
  filter: {
    category: Category | 'all';
    priority: Priority | 'all';
    status: 'all' | 'completed' | 'pending';
  };
  theme: 'light' | 'dark';
} 