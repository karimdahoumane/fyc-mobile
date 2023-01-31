import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { AuthContext } from './AuthContext';

const Logout = () => {
    const { logout } = React.useContext(AuthContext);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
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
