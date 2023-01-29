import React, { useState, useEffect} from "react";
import { FlatList } from "react-native-gesture-handler";
import ChannelItem from "./ChannelItem";
import { API_URL } from "../Utils/Constants";
import { getToken } from "../Auth/TokenProvider";
import { View } from "react-native-web";
import { Text, StyleSheet } from "react-native";

const ChannelsList = () => {
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
            "Authorization": "Bearer " + await getToken(),
        },
        });
      if (!response.ok) {
        setError("Sorry, something went wrong");
        return;
      }
      const json = await response.json();
        setChannels(json);
    } catch (error) {
        console.error(error);
        }
  };

  return (
    
    <View>
        <FlatList
            data={channels}
            renderItem={({ item }) => <ChannelItem channel={item} />}
            keyExtractor={(item) => item.id.toString()}
        />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
    errorText : {
        color: 'red',
        fontSize: 20,
        textAlign: 'center',
    }
});

export default ChannelsList;