import React from 'react';
import {Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ChannelItem = ({navigation, props}) => {

  return (
    <TouchableOpacity style={{backgroundColor: "gray", padding: 20}} 
      onPress={()=> {
        navigation.navigate('Channel', {id: props.id});
      }}>
    <Text>Title: { props.name }</Text>
  </TouchableOpacity>
  );
};

export default ChannelItem;