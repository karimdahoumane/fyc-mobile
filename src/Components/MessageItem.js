import React from "react";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native";


const MessageItem = ({ messageData }) => {

  return (
    <View>
      <Text style={styles.textMessage}>{ messageData.senderUser.nickname } {messageData.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  errorMessage: {
    color: "red",
    fontSize: 20,
    textAlign: "center",
  },
  textMessage: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },

});


export default MessageItem;
