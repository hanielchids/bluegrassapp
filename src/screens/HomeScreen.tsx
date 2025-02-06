import React from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/AppNavigator';

type Props = StackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const lists = [
    {id: '1', name: 'Get Started', completed: 0, total: 10, selected: true},
    {
      id: '2',
      name: 'FE Maintenance Tasks',
      completed: 0,
      total: 0,
      selected: false,
    },
    {id: '3', name: 'Get Started', completed: 7, total: 9, selected: false},
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>To Do</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search for a Task"
        placeholderTextColor="#999"
      />

      {/* Task Lists */}
      <FlatList
        data={lists}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[styles.listItem, item.selected && styles.selectedList]}
            onPress={() => navigation.navigate('List', {listId: item.id})}>
            <Text style={styles.listText}>{item.name}</Text>
            <Text style={styles.progressText}>
              {item.total ? `${item.completed} / ${item.total}` : '-'}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* New List Button */}
      <TouchableOpacity
        style={styles.newListButton}
        onPress={() => navigation.navigate('List', {listId: null})}>
        <Text style={styles.newListText}>+ New List</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F8F8',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchBar: {
    backgroundColor: '#F0F0F0',
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  listItem: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedList: {
    borderColor: 'black',
    borderWidth: 2,
  },
  listText: {
    fontSize: 16,
    fontWeight: '600',
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  newListButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  newListText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
