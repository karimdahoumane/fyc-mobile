import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";

const Channel = ({ channelData }) => {
  const { channelId, channelName } = channelData;
  return (
    <View style={styles.channelItem}>
      <TouchableOpacity>
        <Text style={styles.channelName}>{JSON.stringify(channelName)}</Text>
      </TouchableOpacity>
    </View>
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
});

export default Channel;
