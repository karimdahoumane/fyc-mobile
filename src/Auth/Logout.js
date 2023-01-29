import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { removeToken } from './TokenProvider';
import { Icon } from 'react-native-elements';

const Logout = ({ navigation }) => {
    const handleLogout = async () => {
        await removeToken();
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                <Icon name="logout" type="antdesign" color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    logoutBtn: {
        backgroundColor: 'red',
        borderRadius: 50,
        width: 100,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoutText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
export default Logout;
