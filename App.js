import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/Auth/Login';
import Logout from './src/Auth/Logout';
import Register from './src/Auth/Register';
import Home from './src/Views/Home';
import ProfileScreen from './src/Views/ProfileScreen';
import ChannelScreen from './src/Views/ChannelScreen';
import MenuOptions from './src/Components/MenuOptions';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Logout" component={Logout} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Home" component={Home} 
              options={{
                title: 'My home',
                headerStyle: {
                  backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerRight: () => <MenuOptions />
              }}/>
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="ChannelScreen" component={ChannelScreen} />
          </Stack.Navigator>
          
        </NavigationContainer>
      );
}

export default App;