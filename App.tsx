import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RegistrationScreen from './src/screens/RegistrationScreen';
import LoginScreen from './src/screens/LoginScreen';
import ProductsListing from './src/screens/ProductsListing';
import CartScreen from './src/screens/CartScreen';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

export type RootStackParamList = {
  Registration: undefined;
  Login: undefined;
  ProductsListing: undefined;
  Cart: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Registration"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Registration" component={RegistrationScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="ProductsListing" component={ProductsListing} />
          <Stack.Screen name="Cart" component={CartScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
