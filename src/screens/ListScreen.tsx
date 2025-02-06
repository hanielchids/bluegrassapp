import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  FlatList,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/AppNavigator';

type Props = StackScreenProps<RootStackParamList, 'List'>;

const ListScreen: React.FC<Props> = ({route, navigation}) => {
  const {listId} = route.params ?? {listId: null};
  const [listName, setListName] = useState(listId ? `List ${listId}` : '');
  const [tasks, setTasks] = useState<
    {id: string; name: string; completed: boolean}[]
  >([]);

  const addTask = () => {
    const newTask = {
      id: Date.now().toString(),
      name: `Task ${tasks.length + 1}`,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  return (
    <SafeAreaView style={{flex: 1, padding: 20}}>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>
        {listId ? listName : 'New List'}
      </Text>
      <TextInput
        placeholder="Enter list name"
        value={listName}
        onChangeText={setListName}
        style={{borderBottomWidth: 1, marginVertical: 10}}
      />
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({item}) => <Text>{item.name}</Text>}
      />
      <Button title="Add Task" onPress={addTask} />
      <Button
        title="Back to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </SafeAreaView>
  );
};

export default ListScreen;
