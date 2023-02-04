import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import MessagesList from "../Components/MessagesList";
import MessageInput from "../Components/MessageInput";

const Channel = ({ route, navigation }) => {
  const { channelId, channelName } = route.params;
  const [messages, setMessages] = useState([]);

  return (
    <View style={styles.channelItem}>
      <TouchableOpacity>
        <Text style={styles.channelName}>{JSON.stringify(channelId)}</Text>
        <Text style={styles.channelName}>{JSON.stringify(channelName)}</Text>
      </TouchableOpacity>
      <MessagesList channelId={channelId} navigation={navigation}/>
      <MessageInput channelId={channelId} />
    </View>
  );
};

const styles = StyleSheet.create({
  channelItem: {
    backgroundColor: "#555555",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  channelName: {
    fontSize: 32,
  },
});

export default Channel;
