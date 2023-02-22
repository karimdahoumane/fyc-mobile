import React from "react";
import { StyleSheet, Text, Button } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { View } from "react-native";
import { useState } from "react";
import { useEffect } from "react";
import { API_URL, VIEW_ERROR } from "../Utils/Constants";
import { getToken } from "../Auth/TokenProvider";
import { Icon } from "react-native-elements";
import { getCurrentUser } from "../Auth/AuthProvider";

const Home = ({ navigation }) => {
  const [channels, setChannels] = useState([]);
  const [channel, setChannel] = useState({});
  const [error, setError] = useState("");
  const [nickname, setNickname] = useState();

  useEffect(() => {
    navigation.addListener('focus', () => {
      getChannels();
    });
    async function fetchData() {
      await getCurrentUserNickName();
    }
    fetchData();
  },[navigation, channels]);

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
      navigation.navigate("Channel", {
        channelId: channel.id,
        channelName: channel.name,
      });
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  const getCurrentUserNickName = async () => {
    
    try {
      const currentUser = await getCurrentUser();
      const response = await fetch(API_URL + "users/" + currentUser.sub, {
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
      setNickname(json.nickname);
    } catch (error) {
      console.error(error);
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
        <Text style={styles.titleText}>Hello {nickname} !</Text>
      </View>

      <View style={styles.channelsList}>
        <FlatList
          data={channels}
          renderItem={({ item }) => (
            <View style={styles.channelItem}>
              <TouchableOpacity onPress={navigateToChannel(item, navigation)}>
                <Text numberOfLines={1} style={styles.channelTitleText}>{item.name}</Text>
              </TouchableOpacity>
              <View style={styles.rightActionsContainer}>
                <Icon
                  style={styles.editButton}
                  name="mode-edit"
                  type="material"
                  color="white"
                  onPress={() => editChannel(item)}
                />
                <Icon
                  style={styles.deleteButton}
                  name="delete"
                  type="material"
                  color="white"
                  onPress={() => deleteChannel(item)}
                />
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <Icon
        style={styles.addChannelButton}
        name="circle-with-plus"
        type="entypo"
        color="#0084ff"
        size={50}
        onPress={() => navigation.navigate("ChannelAdd")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  welcomeTitle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  channelsList: {
    flex: 4   ,
  },
  channelItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  channelTitleText: {
    flex: 1,
    fontSize: 18,
    color: "white",
    maxWidth: 225,  
  },

  rightActionsContainer: {
    flexDirection: "row",
  },
  editButton: {
    flex: 1,
    alignSelf: "flex-end",
    margin: 10,
    padding: 10,
    backgroundColor: "orange",
    borderRadius: 5,
  },
  deleteButton: {
    flex: 1,
    alignSelf: "flex-end",
    margin: 10,
    padding: 10,
    backgroundColor: "red",
    borderRadius: 5,
  },
  addChannelButton: {
    flex: 1,
    alignSelf: "flex-end",
    margin: 10,
  },
});

export default Home;
