import React, { useState } from 'react';
import { View, Text, TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SubmitButton from '../Components/SubmitButton';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            /*const response = await axios.post('http://localhost:3001/auth/login', {
                username,
                password,
            });
            console.log(response)*/
            navigation.navigate('Home');
            /*if(response.data.token){
                
                storeToken(response.data.token);
                return true;
                // store the token in AsyncStorage or in a Redux store
                // redirect to the home page or another protected page
            }else{
                setError(response.data.error)
            }*/
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    const navigateToRegister = () => {
        navigation.navigate('Register');
    }

    return (
        <View>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />
            <SubmitButton title="Login" onPress={handleLogin} />
            <SubmitButton title="Register" onPress={navigateToRegister} />
            {error && <Text>{error}</Text>}
        </View>
    );
};

export default Login;