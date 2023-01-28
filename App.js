import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/Auth/Login';
import Register from './src/Auth/Register';
import Home from './src/Views/Home';
import ChannelScreen from './src/Views/ChannelScreen';


const Stack = createStackNavigator();


const App = () => {
    return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="ChannelScreen" component={ChannelScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
}

export default App;