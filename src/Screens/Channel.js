import React, { useState, useRef } from "react";
import { View, Text, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { API_URL, VIEW_ERROR } from "../Utils/Constants";
import { getToken } from "../Auth/TokenProvider";
import { getCurrentUser } from "../Auth/AuthProvider";
import { TextInput } from "react-native";
import { FlatList } from "react-native";
import { useEffect } from "react";

const Channel = ({ route, navigation }) => {
  const { channelId, channelName } = route.params;
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const flatListRef = useRef();

  useEffect(() => {
    getMessagesFromChannel();
  }, []);

  const getMessagesFromChannel = async () => {
    try {
      const response = await fetch(API_URL + "messages/channel/" + channelId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (await getToken()),
        },
      });
      if (!response.ok) {
        setError(VIEW_ERROR);
        return;
      }
      const json = await response.json();
      setMessages(json);
    } catch (error) {
      console.error(error);
      setError(VIEW_ERROR);
    }
  };

  const postMessage = async () => {
    try {
      const userId = await getCurrentUser();
      const response = await fetch(API_URL + "messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (await getToken()),
        },
        body: JSON.stringify({
          message: message,
          channelId: channelId,
          sendUserId: userId,
        }),
      });
      if (!response.ok) {
        setError(VIEW_ERROR);
        return;
      }
      setMessage("");
      getMessagesFromChannel();
      flatListRef.current.scrollToEnd({ animated: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.channelTitle}>
        <TouchableOpacity>
          <Text style={styles.channelName}>
            {JSON.stringify(channelId)}. {JSON.stringify(channelName)}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.messageItem}>
        <FlatList
          ref={flatListRef}
          getItemLayout={(data, index) => ({
            length: 50,
            offset: 50 * index,
            index,
          })}
          data={messages}
          initialScrollIndex={messages.length - 1}
          renderItem={({ item }) => (
            <View style={styles.messageItem}>
              <Text style={styles.textMessage}>
                {item.senderUser.nickname} {item.message}
              </Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.sendItem}>
        <TextInput
          style={styles.messageInput}
          placeholder="Send a message..."
          value={message}
          onChangeText={setMessage}
        />
        <Button
          style={styles.messageButton}
          title="Send"
          onPress={postMessage}
        />
        {error && <Text style={styles.errorMessage}>{error}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  channelTitle: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  channelName: {
    color: "#ffffff",
    fontSize: 20,
  },
  messageItem: {
    flex: 8,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  textMessage: {
    color: "#ffffff",
    fontSize: 20,
  },
  sendItem: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  messageInput: {
    height: 40,
    width: 300,
    borderColor: "gray",
    borderWidth: 1,
    color: "#ffffff",
  },
  messageButton: {
    color: "#ffffff",
  },
  errorMessage: {
    color: "#ff0000",
  },
});

export default Channel;
