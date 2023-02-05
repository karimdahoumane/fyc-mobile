import React from "react";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { API_URL, VIEW_ERROR } from "../Utils/Constants";
import { getToken } from "../Auth/TokenProvider";
import { Icon } from "react-native-elements";
import { Swipeable } from "react-native-gesture-handler";
import { Modal } from "react-native";
import { TextInput } from "react-native";
import { Button } from "react-native";
import { View } from "react-native";

import { useState } from "react";

const ChannelItem = ({ channelData, navigation }) => {
  const [channel, setChannel] = React.useState("");
  const [error, setError] = React.useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [channelToEdit, setChannelToEdit] = useState({});
  const [clickable, setClickable] = useState(false);

  const buttons = [
    {
      text: <Icon name="edit" type="font-awesome" />,
      onPress: () => openEditModal(channelData),
      style: { backgroundColor: "orange", color: "white" },
    },
    {
      text: <Icon name="trash" type="font-awesome" />,
      onPress: () => deleteChannel(channelData),
      style: { backgroundColor: "red", color: "white" },
    },
  ];

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

  const openEditModal = (channelData) => {
    setChannelToEdit(channelData);
    setModalVisible(true);
  };

  const updateChannel = async (channelData) => {
    try {
      const response = await fetch(API_URL + "channels/" + channelData.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (await getToken()),
        },
        body: JSON.stringify(channelData),
      });
      if (!response.ok) {
        setError(VIEW_ERROR);
        return;
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  const deleteChannel = async (channelData) => {
    try {
      const response = await fetch(API_URL + "channels/" + channelData.id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (await getToken()),
        },
      });
      if (!response.ok) {
        setError(VIEW_ERROR);
      }
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  return (
    <Swipeable
      rightButtons={buttons}
      rightButtonContainerStyle={{ alignItems: "center" }}
      onSwipeableRightOpen={() => setClickable(false)}
      onSwipeableRightClose={() => setClickable(true)}
      renderRightActions={() => (
        <View style={styles.rightActionsContainer}>
          {buttons.map((button, index) => (
            <Text
              key={index}
              style={styles.rightActionButton}
              onPress={button.onPress}
            >
              {button.text}
            </Text>
          ))}
        </View>
      )}
    >
      <TouchableOpacity
        style={styles.channelItem}
        onPress={navigateToChannel(channelData, navigation)}
      >
        <Text style={styles.channelName}>{channelData.id}</Text>
        <Text style={styles.channelName}>{channelData.name}</Text>
        {error && <Text style={styles.errorMessage}>{error}</Text>}
      </TouchableOpacity>
    </Swipeable>
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
  deleteButton: {
    backgroundColor: "#ff0000",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    width: 80,
  },
  errorMessage: {
    color: "red",
    fontSize: 20,
    textAlign: "center",
  },
  rightActionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: 80,
  },
  rightActionButton: {
    color: "white",
    fontSize: 16,
    padding: 20,
  },
});

export default ChannelItem;
