import React, { useState } from 'react';
import { View, Text, TextInput, Button} from 'react-native';
import axios from 'axios';
import storeToken from './DeviceStorage';
import SubmitButton from '../Components/SubmitButton';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:3001/auth/register', {
                username,
                password,
            });
            console.log(response)
            if(response.data.token){
                
                storeToken(response.data.token);
                return true;
                // store the token in AsyncStorage or in a Redux store
                // redirect to the home page or another protected page
            }else{
                setError(response.data.error)
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

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
            <SubmitButton title="Confirm Registration" onPress={handleSubmit} />
            {error && <Text>{error}</Text>}
        </View>
    );
}

export default Register;