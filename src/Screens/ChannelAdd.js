import React, { useState } from "react";
import { View, TextInput, StyleSheet, Button } from "react-native";
import { API_URL, VIEW_ERROR } from "../Utils/Constants";
import { getToken } from "../Auth/TokenProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon, Text } from "react-native-elements";

const ChannelAdd = ({ navigation }) => {
  const [text, setText] = useState("");
  const [channelName, setChannelName] = useState("");
  const [error, setError] = useState("");

  const postChannel = async () => {
    try {
      if (channelName.length == 0) return;
      const response = await fetch(API_URL + "channels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (await getToken()),
        },
        body: JSON.stringify({
          name: channelName,
        }),
      });
      if (!response.ok) {
        setError(VIEW_ERROR);
        return;
      }
      setChannelName("");
      navigation.navigate("Home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleItem}>
        <Text style={styles.titleText}>Add a channel</Text>
      </View>
      <View style={styles.sendItem}>
        <TextInput
          style={styles.messageInput}
          placeholder="Channel's name"
          value={channelName}
          onChangeText={setChannelName}
        />
        <Icon
          style={styles.messageButton}
          name="add"
          type="material"
          color="#ffffff"
          onPress={postChannel}
        />
        {error && <Text style={styles.errorMessage}>{error}</Text>}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  titleItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ffffff",
  },
  sendItem: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  messageInput: {
    height: 40,
    borderColor: "#111111",
    backgroundColor: "#c2e0f4",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  messageButton: {
    backgroundColor: "#0084ff",
    padding: 10,
    borderRadius: 5,
  },
  errorMessage: {
    color: "red",
    marginTop: 5,
  },
});

export default ChannelAdd;
