import React from 'react';
import {Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';

const ChannelItem = ({channel}) => {
  return (
    <TouchableOpacity style={styles.channelItem}>
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