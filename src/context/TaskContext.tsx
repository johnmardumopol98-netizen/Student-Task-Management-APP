import React, { createContext, useContext, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { Task } from '../types';

const initialTasks: Task[] = [
  { id: '1', title: 'Theory of Computation Worksheet', subject: 'Theory of Computation', description: 'Finish sets, relations, functions, graphs, trees, strings, and formal languages.', dueDate: '2026-08-28', priority: 'High', status: 'Pending' },
  { id: '2', title: 'React Native Performance Task', subject: 'Mobile Development', description: 'Complete the Student Task Manager app and prepare the demonstration.', dueDate: '2026-09-02', priority: 'High', status: 'Pending' },
  { id: '3', title: 'NNAR Methodology Review', subject: 'Research', description: 'Review and polish the NNAR methodology section of the thesis.', dueDate: '2026-09-05', priority: 'Medium', status: 'Pending' },
  { id: '4', title: 'Digital Signals Notes', subject: 'Digital Logic', description: 'Organize notes for binary numbers and logic gates.', dueDate: '2026-08-26', priority: 'Low', status: 'Completed' },
];

type TaskContextType = {
  tasks: Task[];
  loading: boolean;
  addTask: (task: Omit<Task, 'id' | 'status'>) => void;
  updateTask: (id: string, changes: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  getTask: (id: string) => Task | undefined;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [loading] = useState(false);

  const addTask = (data: Omit<Task, 'id' | 'status'>) => {
    setTasks(current => [{ ...data, id: Date.now().toString(), status: 'Pending' }, ...current]);
  };

  const updateTask = (id: string, changes: Partial<Task>) => {
    setTasks(current => current.map(task => task.id === id ? { ...task, ...changes } : task));
  };

  const deleteTask = (id: string) => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => setTasks(current => current.filter(task => task.id !== id)) },
    ]);
  };

  const toggleTask = (id: string) => updateTask(id, { status: tasks.find(t => t.id === id)?.status === 'Completed' ? 'Pending' : 'Completed' });
  const getTask = (id: string) => tasks.find(task => task.id === id);

  const value = useMemo(() => ({ tasks, loading, addTask, updateTask, deleteTask, toggleTask, getTask }), [tasks, loading]);
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used inside TaskProvider');
  return context;
}
