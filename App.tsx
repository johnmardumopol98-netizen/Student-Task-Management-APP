import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { TaskProvider } from './src/context/TaskContext';
import HomeScreen from './src/screens/HomeScreen';
import TasksScreen from './src/screens/TasksScreen';
import AddTaskScreen from './src/screens/AddTaskScreen';
import TaskDetailsScreen from './src/screens/TaskDetailsScreen';
import EditTaskScreen from './src/screens/EditTaskScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { RootStackParamList, MainTabParamList } from './src/types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#64748b',
        tabBarStyle: { height: 64, paddingBottom: 8, paddingTop: 6 },
        tabBarIcon: ({ color, size }) => {
          const icons: Record<keyof MainTabParamList, keyof typeof Ionicons.glyphMap> = {
            Home: 'home-outline',
            Tasks: 'checkmark-circle-outline',
            Add: 'add-circle-outline',
            Profile: 'person-outline',
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Tasks" component={TasksScreen} />
      <Tab.Screen name="Add" component={AddTaskScreen} options={{ title: 'Create' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <TaskProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
          <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
          <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} options={{ title: 'Task Details' }} />
          <Stack.Screen name="EditTask" component={EditTaskScreen} options={{ title: 'Edit Task' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </TaskProvider>
  );
}
