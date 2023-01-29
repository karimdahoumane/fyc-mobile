import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import ChannelsList from "../Components/ChannelsList";
import { StyleSheet } from "react-native";

const HomeScreen = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ChannelsList style={Styles.channelList}/>
      )}
      
    </View>
  );
};

const Styles = StyleSheet.create({
  channelList: {
    flex: 1,
  },
});

export default HomeScreen;