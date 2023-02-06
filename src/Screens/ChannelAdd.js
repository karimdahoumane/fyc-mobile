import React, { useState } from "react";
import { View, TextInput, StyleSheet, Button } from "react-native";
import { API_URL, VIEW_ERROR } from "../Utils/Constants";
import { getToken } from "../Auth/TokenProvider";


const ChannelAdd = ({ navigation }) => {
  const [text, setText] = useState("");
  const [channelName, setChannelName] = useState("");
  const [error, setError] = useState("");


  const postChannel = async () => {
    try {
      const response = await fetch(API_URL + "channels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (await getToken()),
        },
        body: JSON.stringify({
          name: channelName
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
    <View style={styles.sendItem}>
        <TextInput
          style={styles.messageInput}
          placeholder="Nom du channel"
          value={channelName}
          onChangeText={setChannelName}
        />
        <Button
          style={styles.messageButton}
          title="Ajouter"
          onPress={postChannel}
        />
        {error && <Text style={styles.errorMessage}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
  },
});

export default ChannelAdd;


