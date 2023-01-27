import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/Auth/Login';
import Register from './src/Auth/Register';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ title: 'Welcome' }}
                />
                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{ title: 'Sign Up' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;