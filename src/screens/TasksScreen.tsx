import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useTasks } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Main'>;
export default function TasksScreen({ navigation }: Props) {
  const { tasks, toggleTask } = useTasks();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'All' | 'Pending' | 'Completed'>('All');
  const filtered = useMemo(() => tasks.filter(t => (filter === 'All' || t.status === filter) && `${t.title} ${t.subject}`.toLowerCase().includes(search.toLowerCase())), [tasks, filter, search]);

  return <SafeAreaView style={styles.safe}><View style={styles.container}>
    <Text style={styles.title}>My Tasks</Text>
    <TextInput value={search} onChangeText={setSearch} placeholder="Search tasks or subjects..." style={styles.search} />
    <View style={styles.filters}>{(['All', 'Pending', 'Completed'] as const).map(item => <Pressable key={item} onPress={() => setFilter(item)} style={[styles.filter, filter === item && styles.active]}><Text style={filter === item ? styles.activeText : styles.filterText}>{item}</Text></Pressable>)}</View>
    <FlatList data={filtered} keyExtractor={item => item.id} contentContainerStyle={{ paddingBottom: 30 }} renderItem={({ item }) => <TaskCard task={item} onPress={() => navigation.navigate('TaskDetails', { taskId: item.id })} onToggle={() => toggleTask(item.id)} />} ListEmptyComponent={<Text style={styles.empty}>No tasks found.</Text>} />
  </View></SafeAreaView>;
}
const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: '#f8fafc' }, container: { flex: 1, padding: 20, maxWidth: 900, width: '100%', alignSelf: 'center' }, title: { fontSize: 28, fontWeight: '800', marginBottom: 14 }, search: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 12 }, filters: { flexDirection: 'row', gap: 8, marginBottom: 15 }, filter: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20, backgroundColor: '#e2e8f0' }, active: { backgroundColor: '#2563eb' }, filterText: { color: '#475569' }, activeText: { color: '#fff', fontWeight: '700' }, empty: { textAlign: 'center', marginTop: 50, color: '#64748b' } });
