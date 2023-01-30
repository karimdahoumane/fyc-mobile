import React from "react";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { API_URL, VIEW_ERROR } from "../Utils/Constants";
import { getToken } from "../Auth/TokenProvider";

const ChannelItem = ({ channelData }, { navigation }) => {
  const [channel, setChannel] = React.useState("");
  const [error, setError] = React.useState("");

  const navigateToChannel = (channel) => async () => {
    try {
      const response = await fetch(API_URL + "channels/" + channel.id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (await getToken()),
        },
      });
      if (!response.ok) {
        setError(VIEW_ERROR);
      }

      const json = await response.json();

      setChannel(json);
      navigation.navigate("ChannelScreen", { channel: json });
    } catch (error) {
      console.error(error);
      setError(VIEW_ERROR);
    }
  };

  return (
    <TouchableOpacity
      style={styles.channelItem}
      onPress={navigateToChannel(channelData)}
    >
      <Text style={styles.channelName}>{channelData.id}</Text>
      <Text style={styles.channelName}>{channelData.name}</Text>
      {error && <Text style={styles.errorMessage}>{error}</Text>}
    </TouchableOpacity>
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
  errorMessage: {
    color: "red",
    fontSize: 20,
    textAlign: "center",
  },
});

export default ChannelItem;
