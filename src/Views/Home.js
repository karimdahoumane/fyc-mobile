import React, { useEffect, useState } from 'react';
import { View, Text, Button} from 'react-native';
import ChannelItem from '../Components/ChannelItem';
import ChannelsList from '../Components/ChannelsList';
import { FlatList, ActivityIndicator } from 'react-native';


const Home = ({navigation}) => {
    const [channels, setChannels] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxvdWlzcGVsYXJyZXlAZ21haWwuY29tIiwiaWF0IjoxNjc0OTMyNjY5LCJleHAiOjE2NzQ5MzI3Mjl9.L60hhAwYkTN2VMu-x-x9Mk8OGTWX4I-G9Z92RdGhekw";
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);

    const getChannels = async () => {
        try {
          const response = await fetch('http://localhost:3001/channels', {
            method: 'GET',
            headers: headers});
          const json = await response.json();
            setChannels(json.channels);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

    useEffect(() => {
        getChannels();
    }, []);

    const handleLogout = () => {
        navigation.navigate('Login');
    }

    return (
        <View style={{flex: 1, padding: 24}}>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <FlatList
                    data={channels}
                    keyExtractor={({props}) => props}
                    renderItem={({item}) => (
                        <ChannelItem navigation={navigation} props={item.id}/>
                    )}
                />
            
            )}
            <Button
                title="Logout"
                onPress={handleLogout}
            />
        </View>
    );
}

export default Home;