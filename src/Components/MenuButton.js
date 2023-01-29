import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { StyleSheet } from "react-native";
import { Icon } from 'react-native-elements';

const MenuButton = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={Styles.menuButton}>
            <Icon name="bars" type="antdesign" color="#fff" />
        </TouchableOpacity>
    );
}

const Styles = StyleSheet.create({
    menuButton: {
        backgroundColor: '#1E90FF',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        width: 100,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuButtonText: {
        color: 'white',
        fontSize: 20,
    }
});

export default MenuButton;
