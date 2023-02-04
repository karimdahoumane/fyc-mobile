import React, { useState, useEffect } from "react";
import { API_URL, VIEW_ERROR } from "../Utils/Constants";
import { getToken } from "../Auth/TokenProvider";
import { Text, StyleSheet, Input, Button } from "react-native";
import { View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { getCurrentUser } from "../Auth/AuthProvider";

const MessageInput = ({ channelId }) => {
  
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const postMessage = async () => {
    try {
      const userId = await getCurrentUser();
      const response = await fetch(API_URL + "messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + await getToken(),
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
      const json = await response.json();
      setMessage(json);
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.messageInput} placeholder="Send a message..." onChangeText={setMessage} />
      <Button style={styles.messageButton} title="Send" onPress={postMessage} />
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
  messageInput: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  messageButton: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
});

export default MessageInput;
