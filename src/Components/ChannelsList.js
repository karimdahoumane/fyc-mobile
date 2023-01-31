import React, { useState, useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import ChannelItem from "./ChannelItem";
import { API_URL, VIEW_ERROR } from "../Utils/Constants";
import { getToken } from "../Auth/TokenProvider";
import { Text, StyleSheet } from "react-native";
import { View } from "react-native";

const ChannelsList = ({ navigation }) => {
  const [channels, setChannels] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getChannels();
  }, []);

  const getChannels = async () => {
    try {
      const response = await fetch(API_URL + "channels", {
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
      setChannels(json);
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={channels}
        renderItem={({ item }) => (
          <ChannelItem channelData={item} navigation={navigation} />
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

export default ChannelsList;
