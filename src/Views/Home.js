import React, { useEffect, useState } from "react";
import { View } from "react-native";
import ChannelItem from "../Components/ChannelItem";
import Logout from "../Auth/Logout";
import { FlatList, ActivityIndicator } from "react-native";

const Home = ({ navigation }) => {
  const [channels, setChannels] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxvdWlzcGVsYXJyZXlAZ21haWwuY29tIiwiaWF0IjoxNjc0OTMyNjY5LCJleHAiOjE2NzQ5MzI3Mjl9.L60hhAwYkTN2VMu-x-x9Mk8OGTWX4I-G9Z92RdGhekw";
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  const getChannels = async () => {
    try {
      const response = await fetch("http://localhost:3001/channels", {
        method: "GET",
        headers: headers,
      });
      const json = await response.json();
      setChannels(json.channels);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getChannels();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={channels}
          keyExtractor={({ props }) => props}
          renderItem={({ item }) => (
            <ChannelItem navigation={navigation} props={item.id} />
          )}
        />
      )}
      <Logout navigation={navigation} />
    </View>
  );
};

export default Home;
