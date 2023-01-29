import MenuButton from './MenuButton';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Logout from '../Auth/Logout';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const MenuOptions = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const navigation = useNavigation();

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };
    const navigateToProfile = () => {
        navigation.navigate('ProfileScreen');
        setMenuVisible(false);
    };

    return (
        <View>
            <MenuButton style={ styles.menuButton } onPress={toggleMenu} />
            {menuVisible && (
                <View style={styles.menuView}>
                    <View style={styles.container}>
                        <TouchableOpacity style={styles.profileButton} onPress={navigateToProfile}>
                            <Icon name="user" type="antdesign" color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <Logout navigation={navigation} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    menuView: {
        position: 'absolute',
        top: 50,
        right: 10,
        backgroundColor: 'transparent',
        padding: 10,
        borderRadius: 50,
        elevation: 5,
    },
    menuButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    menuOption: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
    },
    menuOptionText: {
        fontSize: 18,
        color: 'black',
    },
    container: {
        backgroundColor: '#1E90FF',
        borderRadius: 50,
        width: 100,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileButton: {
        backgroundColor: 'gray',
        borderRadius: 50,
        width: 100,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default MenuOptions;