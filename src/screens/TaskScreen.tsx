import React, {useState} from 'react';
import {View, Text, TextInput, Button, FlatList} from 'react-native';

const TaskScreen = () => {
  const [tasks, setTasks] = useState([
    {id: '1', text: 'Buy milk', completed: false},
  ]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    setTasks([
      ...tasks,
      {id: Date.now().toString(), text: newTask, completed: false},
    ]);
    setNewTask('');
  };

  return (
    <View>
      <Text>Tasks</Text>
      <TextInput
        placeholder="New Task"
        value={newTask}
        onChangeText={setNewTask}
      />
      <Button title="Add Task" onPress={addTask} />
      <FlatList
        data={tasks}
        renderItem={({item}) => <Text>{item.text}</Text>}
      />
    </View>
  );
};

export default TaskScreen;
