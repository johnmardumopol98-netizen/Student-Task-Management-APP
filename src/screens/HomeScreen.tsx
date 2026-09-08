import React from 'react';
import { ActivityIndicator, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useTasks } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';

type Props = NativeStackScreenProps<RootStackParamList, 'Main'>;

export default function HomeScreen({ navigation }: Props) {
  const { tasks, loading, toggleTask } = useTasks();
  const pending = tasks.filter(t => t.status === 'Pending');
  const completed = tasks.filter(t => t.status === 'Completed');

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.hero}>
          <View style={{ flex: 1 }}>
            <Text style={styles.hello}>Hello, Student! 👋</Text>
            <Text style={styles.subtitle}>Stay organized and finish your tasks on time.</Text>
          </View>
          <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135755.png' }} style={styles.avatar} />
        </View>

        <View style={styles.statsRow}>
          <View style={styles.stat}><Text style={styles.statNumber}>{tasks.length}</Text><Text style={styles.statLabel}>Total</Text></View>
          <View style={styles.stat}><Text style={styles.statNumber}>{pending.length}</Text><Text style={styles.statLabel}>Pending</Text></View>
          <View style={styles.stat}><Text style={styles.statNumber}>{completed.length}</Text><Text style={styles.statLabel}>Done</Text></View>
        </View>

        <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Upcoming Tasks</Text><Pressable onPress={() => navigation.navigate('Main', { screen: 'Tasks' } as never)}><Text style={styles.link}>View all</Text></Pressable></View>
        {loading ? <ActivityIndicator size="large" /> : pending.slice(0, 3).map(task => <TaskCard key={task.id} task={task} onPress={() => navigation.navigate('TaskDetails', { taskId: task.id })} onToggle={() => toggleTask(task.id)} />)}

        <Pressable style={styles.addButton} onPress={() => navigation.navigate('Main', { screen: 'Add' } as never)}><Text style={styles.addText}>＋ Create New Task</Text></Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f8fafc' }, container: { padding: 20, maxWidth: 900, width: '100%', alignSelf: 'center' },
  hero: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 }, hello: { fontSize: 27, fontWeight: '800', color: '#0f172a' }, subtitle: { marginTop: 7, color: '#64748b', lineHeight: 20 }, avatar: { width: 62, height: 62, marginLeft: 12 },
  statsRow: { flexDirection: 'row', gap: 10, marginVertical: 20 }, stat: { flex: 1, backgroundColor: '#fff', borderRadius: 16, padding: 15, alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0' }, statNumber: { fontSize: 24, fontWeight: '800', color: '#2563eb' }, statLabel: { color: '#64748b', marginTop: 3 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }, sectionTitle: { fontSize: 20, fontWeight: '800' }, link: { color: '#2563eb', fontWeight: '700' }, addButton: { backgroundColor: '#2563eb', padding: 16, borderRadius: 14, alignItems: 'center', marginTop: 8 }, addText: { color: '#fff', fontWeight: '800', fontSize: 16 }
});
