import React from 'react';
import { View, Text, Button} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';


const Home = () => {
    const state = {
        channels: [
            { name: 'channel 1' },
            { name: 'channel 2' },
            { name: 'channel 3' },
            { name: 'channel 4' },
            { name: 'channel 5' },
        ]
    };

    // fonction pour renvoyer vers Login

    const handleLogout = () => {
        navigation.navigate('Login');
    }


    return (
        <View>
            <FlatList
                data={state.channels}
                keyExtractor={item => item.name}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.name}</Text>
                    </View>
                )}
            />
            <Button
            title="Logout"
            onPress={handleLogout}
            />
        </View>
    );
}

export default Home;