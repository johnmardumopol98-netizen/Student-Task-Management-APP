export type Priority = 'Low' | 'Medium' | 'High';
export type TaskStatus = 'Pending' | 'Completed';

export type Task = {
  id: string;
  title: string;
  subject: string;
  description: string;
  dueDate: string;
  priority: Priority;
  status: TaskStatus;
};

export type RootStackParamList = {
  Main: undefined;
  TaskDetails: { taskId: string };
  EditTask: { taskId: string };
};

export type MainTabParamList = {
  Home: undefined;
  Tasks: undefined;
  Add: undefined;
  Profile: undefined;
};
