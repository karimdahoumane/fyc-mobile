import React from "react";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { API_URL, VIEW_ERROR } from "../Utils/Constants";
import { getToken } from "../Auth/TokenProvider";
import { Icon } from "react-native-elements";

const ChannelItem = ({ channelData, navigation }) => {
  const [channel, setChannel] = React.useState("");
  const [error, setError] = React.useState("");

  const navigateToChannel = (channelData, navigation) => async () => {
    try {
      const response = await fetch(API_URL + "channels/" + channelData.id, {
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
      navigation.navigate("Channel", {
        channelId: channelData.id,
        channelName: channelData.name,
      });
    } catch (error) {
      console.error(error);
      setError(VIEW_ERROR);
    }
  };

  return (
    <TouchableOpacity
      style={styles.channelItem}
      onPress={navigateToChannel(channelData, navigation)}
    >
      <Text style={styles.channelName}>{channelData.id}</Text>
      <Text style={styles.channelName}>{channelData.name}</Text>
      <Icon name="delete" size={30} color="#900" />
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
