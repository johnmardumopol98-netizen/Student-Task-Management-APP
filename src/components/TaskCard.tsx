import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Task } from '../types';

export default function TaskCard({ task, onPress, onToggle }: { task: Task; onPress: () => void; onToggle: () => void }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Pressable onPress={onToggle} style={styles.check}>
        <Ionicons name={task.status === 'Completed' ? 'checkmark-circle' : 'ellipse-outline'} size={26} color={task.status === 'Completed' ? '#16a34a' : '#64748b'} />
      </Pressable>
      <View style={styles.body}>
        <Text style={[styles.title, task.status === 'Completed' && styles.done]} numberOfLines={1}>{task.title}</Text>
        <Text style={styles.subject}>{task.subject}</Text>
        <Text style={styles.date}>Due: {task.dueDate}</Text>
      </View>
      <View style={[styles.badge, task.priority === 'High' ? styles.high : task.priority === 'Medium' ? styles.medium : styles.low]}>
        <Text style={styles.badgeText}>{task.priority}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 14, 
    marginBottom: 10, 
    backgroundColor: '#fff', 
    borderRadius: 16, 
    borderWidth: 1, 
    borderColor: '#e2e8f0', 
    shadowOpacity: 0.04, 
    shadowRadius: 5, 
    elevation: 1 
  },
  check: {
    marginRight: 10 
  },
  body: { 
    flex: 1 
  },
  title: { 
    fontSize: 16, 
    fontWeight: '700', 
    color: '#0f172a' 
  },
  done: { 
    textDecorationLine: 'line-through', 
    color: '#64748b' 
  },
  subject: { 
    marginTop: 3, 
    color: '#2563eb', 
    fontSize: 13 
  },
  date: { 
    marginTop: 4, 
    color: '#64748b', 
    fontSize: 12 
  },
  badge: { 
    paddingHorizontal: 9, 
    paddingVertical: 5, 
    borderRadius: 10 
  },
  high: { 
    backgroundColor: '#fee2e2' 
  }, 
  medium: { 
    backgroundColor: '#fef3c7'
  }, 
  low: { 
    backgroundColor: '#dcfce7'
  },
  badgeText: { 
    fontSize: 11, 
    fontWeight: '700', 
    color: '#334155' 
  },
});
