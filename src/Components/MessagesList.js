import React, { useState, useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import MessageItem from "./MessageItem";
import { API_URL, VIEW_ERROR } from "../Utils/Constants";
import { getToken } from "../Auth/TokenProvider";
import { Text, StyleSheet } from "react-native";
import { View } from "react-native";

const MessagesList = ({ channelId }) => {
  const [messages, setMessages] = useState([]);
  const [messageUpdated, setMessageUpdated] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getMessagesFromChannel()
  }, [messages]);

  
  const getMessagesFromChannel = async () => {
    try {
      const response = await fetch(API_URL + "messages", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + await getToken(),
        },
      });
      if (!response.ok) {
        setError(VIEW_ERROR);
        return;
      }
      const json = await response.json();
      console.log(json)
      // filter json to only show messages for the current channel
      const channelMessages = json.filter(
         (message) => message.channel.id == channelId
       );
       setMessages(channelMessages);
    } catch (error) {
      console.error(error);
      setError(VIEW_ERROR);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <MessageItem messageData={item} />
        )}
        keyExtractor={(item) => item.id}
      />
      {error && <Text style={styles.errorMessage}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  errorMessage: {
    color: "red",
    fontSize: 20,
    textAlign: "center",
  },
});

export default MessagesList;
