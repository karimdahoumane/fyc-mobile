import React from "react";
import { StyleSheet, Text, Button } from "react-native";
import { ScreenContainer } from "react-native-screens";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { View } from "react-native";
import { useState } from "react";
import { useEffect } from "react";
import { API_URL, VIEW_ERROR } from "../Utils/Constants";
import { getToken } from "../Auth/TokenProvider";
import { Icon } from "react-native-elements";

const Home = ({ navigation }) => {
  const [channels, setChannels] = useState([]);
  const [channel, setChannel] = useState({});
  const [channelToEdit, setChannelToEdit] = useState({});
  const [error, setError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const buttons = [
    {
      text: <Icon name="edit" type="font-awesome" />,
      style: { backgroundColor: "orange", color: "white" },
    },
    {
      text: <Icon name="trash" type="font-awesome" />,
      style: { backgroundColor: "red", color: "white" },
    },
  ];

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
    } catch (error) {
      console.error(error);
    }
  };

  const navigateToChannel = (channel, navigation) => async () => {
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
      console.log(json);
      navigation.navigate("Channel", {
        channelId: channel.id,
        channelName: channel.name,
      });
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  const editChannel = (channel) => {
    navigation.navigate("ChannelEdit",{channel})
  };

  const deleteChannel = async (channel) => {
    try {
      const response = await fetch(API_URL + "channels/" + channel.id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (await getToken()),
        },
      });
      if (!response.ok) {
        setError(VIEW_ERROR);
        return;
      }
      getChannels();
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.welcomeTitle}>
        <Text style={styles.titleText}>Welcome to the chat app!</Text>
      </View>

      <View style={styles.channelsList}>
        <FlatList
          data={channels}
          renderItem={({ item }) => (
            <View style={styles.channelItem}>
              <TouchableOpacity onPress={navigateToChannel(item, navigation)}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
              <View style={styles.rightActionsContainer}>
                <TouchableOpacity onPress={() => editChannel(item)}>
                  <Text style={styles.rightActionButton}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteChannel(item)}>
                  <Text style={styles.rightActionButton}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.addChannelButton}>
        <Button
          style={styles.messageButton}
          title="Ajouter un channel"
          onPress={() => navigation.navigate("ChannelAdd")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeTitle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  channelsList: {
    flex: 4,
    width: "100%",
  },
  channelItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  rightActionsContainer: {
    flexDirection: "row",
  },
  rightActionButton: {
    color: "white",
    backgroundColor: "red",
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
});

export default Home;
