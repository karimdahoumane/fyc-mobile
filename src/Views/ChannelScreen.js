import React, { useState } from 'react';
import { View, Text, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
    
import ChannelsList from '../Components/ChannelsList';


const ChannelScreen = (channel) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const navigation = useNavigation();

    return (
        <View style={styles.channelItem}>
            <TouchableOpacity onPress={() => navigation.navigate('ChannelScreen', { channel: channel })}>
                <Text style={styles.channelName}>{channel.name}</Text>
            </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({
    channelItem: {
        backgroundColor: '#555555',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    channelName: {
        fontSize: 32,
    },
});

export default ChannelScreen;