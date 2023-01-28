import React, { useState } from 'react';
import { View, Text, TextInput, Button} from 'react-native';
import axios from 'axios';
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