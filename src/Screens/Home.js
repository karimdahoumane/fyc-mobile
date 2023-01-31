import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
import ChannelsList from "../Components/ChannelsList";
import { ScreenContainer } from "react-native-screens";

const Home = ({ navigation }) => {
  return (
  <ScreenContainer>
    <Text>Bonjour !</Text>
    <ChannelsList navigation={navigation} />
    <Button title="Sign Out" onPress={() => navigation.logout()} />
  </ScreenContainer>
  );
};

export default Home;
