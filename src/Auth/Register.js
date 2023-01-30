import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '../Utils/Constants';

const Register = () => {
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigation = useNavigation();

    const handleRegister = async () => {
        try {
            const response = await fetch(API_URL+'users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    nickname,
                    password,
                }),
            });
            const json = await response.json();
            
            console.log(json);
            if (json.email) {
                navigation.navigate('Login');
                setEmail('');
                setNickname('');
                setPassword('');
                setError('');
            } else {
                setError('Invalid username or password');
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    const navigateToLogin = () => {
        navigation.navigate('Login');
    }

    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.welcomeView}>
          <Text style={styles.welcomeText}>Registration</Text>
          <TouchableOpacity onPress={navigateToLogin}>
            <Text style={styles.loginText}>
              You already have an account ? <Text style={{ fontWeight: 'bold' }}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            onChangeText={(email) => setEmail(email)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Nickname"
            placeholderTextColor="#003f5c"
            onChangeText={(nickname) => setNickname(nickname)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <TouchableOpacity
          style={styles.registerBtn}
          onPress={handleRegister}
        >
          <Text style={styles.registerText}>CONFIRM</Text>
        </TouchableOpacity>
      </View>
    );

    
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003f5c',
        alignItems: 'center',
        justifyContent: 'center',
    },
    welcomeView: {
        marginBottom: 40,
    },
    welcomeText: {
        fontSize: 30,
        color: '#fb5b5a',
        fontWeight: 'bold',
    },
    loginText: {
        color: 'white',
        fontSize: 15,   
    },
    inputView: {
        backgroundColor: '#465881',
        borderRadius: 30,
        width: '70%',
        height: 45,
        marginBottom: 20,
        alignItems: 'center',
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },
    registerBtn: {
        width: '70%',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        backgroundColor: '#fb5b5a',
    },
    registerText: {
        color: 'white',
    },
    errorText: {
        color: 'red',
        marginBottom: 20,
    },
});

export default Register;