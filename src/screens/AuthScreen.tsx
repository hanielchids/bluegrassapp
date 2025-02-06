import React, {useState, useContext} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {StackScreenProps} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native-safe-area-context';

type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
};

type Props = StackScreenProps<RootStackParamList, 'Auth'>;

const AuthScreen: React.FC<Props> = ({navigation}) => {
  const {signIn} = useContext(AuthContext)!;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Simulating API call
    const fakeToken = '123456';
    signIn(fakeToken);
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView>
      <Text>Login</Text>
      <TextInput
        style={{width: '80%', borderBottomColor: 'gray', borderBottomWidth: 1}}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={{width: '80%', borderBottomColor: 'gray', borderBottomWidth: 1}}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </SafeAreaView>
  );
};

export default AuthScreen;
