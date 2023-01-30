import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import ChannelsList from "../Components/ChannelsList";

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcomeTitle}>Bonjour !</Text>
      <ChannelsList navigation={navigation} style={styles.channelList} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  welcomeTitle: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  channelList: {
    marginTop: 20,
  },
});

export default HomeScreen;
