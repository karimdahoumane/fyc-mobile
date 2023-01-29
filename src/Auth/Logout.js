import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { removeToken } from './TokenProvider';

const Logout = ({ navigation }) => {
    const handleLogout = async () => {
        await removeToken();
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                <Text style={styles.logoutText}>LOGOUT</Text> 
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoutBtn: {
        width:"80%",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#FF1493",
    },
    logoutText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default Logout;
