import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MenuButton from './Components/MenuButton';

const Header = () => {
    const navigation = useNavigation();

    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    return (
        <View>
            <MenuButton onPress={toggleMenu} />
            {menuVisible && (
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                        <Text>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => disconnect()}>
                        <Text>Disconnect</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default Header;