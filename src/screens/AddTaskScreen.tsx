import React, { useState } from 'react';
import { Alert, Button, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useTasks } from '../context/TaskContext';
import { Priority } from '../types';

export default function AddTaskScreen() {
  const { addTask } = useTasks();
  const [title, setTitle] = useState(''); const [subject, setSubject] = useState(''); const [description, setDescription] = useState(''); const [dueDate, setDueDate] = useState(''); const [priority, setPriority] = useState<Priority>('Medium'); const [modal, setModal] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const validate = () => { const e: Record<string,string> = {}; if (title.trim().length < 3) e.title = 'Title must be at least 3 characters.'; if (!subject.trim()) e.subject = 'Subject is required.'; if (!/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) e.dueDate = 'Use YYYY-MM-DD.'; setErrors(e); return Object.keys(e).length === 0; };
  const save = () => { if (!validate()) return; addTask({ title: title.trim(), subject: subject.trim(), description: description.trim(), dueDate, priority }); Alert.alert('Success', 'Task created successfully.'); setTitle(''); setSubject(''); setDescription(''); setDueDate(''); setPriority('Medium'); };
  return <SafeAreaView style={styles.safe}><ScrollView contentContainerStyle={styles.container}><Text style={styles.heading}>Create Task</Text><Text style={styles.help}>Fill in the information below. Validation prevents incomplete records.</Text>
    <Text style={styles.label}>Task Title *</Text><TextInput value={title} onChangeText={setTitle} placeholder="e.g. Database Assignment" style={styles.input} />{errors.title && <Text style={styles.error}>{errors.title}</Text>}
    <Text style={styles.label}>Subject *</Text><TextInput value={subject} onChangeText={setSubject} placeholder="e.g. Database Management" style={styles.input} />{errors.subject && <Text style={styles.error}>{errors.subject}</Text>}
    <Text style={styles.label}>Description</Text><TextInput value={description} onChangeText={setDescription} placeholder="Task details..." multiline style={[styles.input, { height: 100, textAlignVertical: 'top' }]} />
    <Text style={styles.label}>Due Date *</Text><TextInput value={dueDate} onChangeText={setDueDate} placeholder="YYYY-MM-DD" style={styles.input} />{errors.dueDate && <Text style={styles.error}>{errors.dueDate}</Text>}
    <Text style={styles.label}>Priority</Text><Pressable style={styles.select} onPress={() => setModal(true)}><Text>{priority}</Text><Text>⌄</Text></Pressable>
    <Button title="Save Task" onPress={save} />
    <Modal visible={modal} transparent animationType="fade" onRequestClose={() => setModal(false)}><Pressable style={styles.overlay} onPress={() => setModal(false)}><View style={styles.modal}><Text style={styles.modalTitle}>Choose Priority</Text>{(['Low','Medium','High'] as Priority[]).map(p => <Pressable key={p} style={styles.option} onPress={() => { setPriority(p); setModal(false); }}><Text style={{ fontSize: 16 }}>{p}</Text></Pressable>)}</View></Pressable></Modal>
  </ScrollView></SafeAreaView>;
}
const styles = StyleSheet.create({ safe:{flex:1,backgroundColor:'#f8fafc'},container:{padding:20,maxWidth:700,width:'100%',alignSelf:'center'},heading:{fontSize:28,fontWeight:'800',color:'#0f172a'},help:{color:'#64748b',marginTop:6,marginBottom:20},label:{fontWeight:'700',marginBottom:7,marginTop:12},input:{backgroundColor:'#fff',borderWidth:1,borderColor:'#cbd5e1',borderRadius:12,padding:12,fontSize:15},error:{color:'#dc2626',fontSize:12,marginTop:4},select:{backgroundColor:'#fff',borderWidth:1,borderColor:'#cbd5e1',borderRadius:12,padding:13,flexDirection:'row',justifyContent:'space-between',marginBottom:20},overlay:{flex:1,backgroundColor:'rgba(15,23,42,.45)',justifyContent:'center',alignItems:'center',padding:30},modal:{backgroundColor:'#fff',borderRadius:18,padding:20,width:'100%',maxWidth:360},modalTitle:{fontSize:20,fontWeight:'800',marginBottom:10},option:{padding:14,borderBottomWidth:1,borderBottomColor:'#e2e8f0'}});
