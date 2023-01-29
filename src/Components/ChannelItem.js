import React from 'react';
import {Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import {API_URL, VIEW_ERROR} from '../Utils/Constants';
import {getToken} from '../Auth/TokenProvider';
import {useNavigation} from '@react-navigation/native';


const ChannelItem = ({channel}) => {
  const [error, setError] = React.useState("");

  const navigation = useNavigation();

  const navigateToChannel = (channelId) => async () => {
    try {
      const response = await fetch(API_URL + "channels/" + channelId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + await getToken(),
        },
      });
      if (!response.ok) {
        setError(VIEW_ERROR);
      }
      const json = await response.json();
      navigation.navigate('ChannelScreen', {channel: json.id});
    } catch (error) {
        console.error(error);
        }
  };

  return (
    <TouchableOpacity style={styles.channelItem} onPress={navigateToChannel(channel.id)}>
      <Text style={styles.channelName}>{channel.id}</Text>
      <Text style={styles.channelName}>{channel.name}</Text>
    </TouchableOpacity>
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

export default ChannelItem;