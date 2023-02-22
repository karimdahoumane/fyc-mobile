import React, { useState, useRef } from "react";
import { View, Text, Button } from "react-native";
import { StyleSheet } from "react-native";
import { API_URL, VIEW_ERROR } from "../Utils/Constants";
import { getToken } from "../Auth/TokenProvider";
import { getCurrentUser } from "../Auth/AuthProvider";
import { TextInput } from "react-native";
import { FlatList } from "react-native";
import { useEffect } from "react";
import { Icon } from "react-native-elements";

const Channel = ({ route, navigation }) => {
  const { channelId, channelName } = route.params;
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const flatListRef = useRef();
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    getMessagesFromChannel();
    async function fetchData() {
      await getLoggedInUser();
    }
    fetchData();
  }, []);

  const getLoggedInUser = async () => {
    const response = await getCurrentUser();
    setCurrentUser(response);
  };

  const getMessagesFromChannel = async () => {
    try {
      const response = await fetch(API_URL + "messages/channel/" + channelId, {
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
      setMessages(json.reverse());
    } catch (error) {
      console.error(error);
      setError(VIEW_ERROR);
    }
  };

  const postMessage = async () => {
    try {
      if (message.length == 0) return;
      const response = await fetch(API_URL + "messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (await getToken()),
        },
        body: JSON.stringify({
          message: message,
          channelId: channelId,
          senderId: currentUser.sub,
        }),
      });
      if (!response.ok) {
        setError(VIEW_ERROR);
        return;
      }
      setMessage("");
      getMessagesFromChannel();
      flatListRef.current.scrollToEnd({ animated: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.channelTitle}>
          <Icon
            style={styles.goBackButton}
            name="arrow-back"
            type="material"
            color="#ffffff"
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.channelName}>
            {channelName}
          </Text>
        
      </View>
      <View style={styles.messageItem}>
        <FlatList
          ref={flatListRef}
          inverted={true}
          data={messages}
          renderItem={({ item }) => (
            <View>
              <View style={[
                styles.messageItem,
                item.senderUser.id == currentUser.sub ? styles.sentMessage : styles.receivedMessage
              ]}> 
                <Text style={styles.textMessage}>
                  {item.message}
                </Text>
              </View>
              <View style={styles.textSender}>
                {item.senderUser.id !== currentUser.sub &&
                <Text style={styles.senderName}>
                  {item.senderUser.nickname}
                </Text>
                }
              </View>
            </View>
          )
        }
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.sendItem}>
        <TextInput
          style={styles.messageInput}
          placeholder="Send a message..."
          value={message}
          onChangeText={setMessage}
        />
        <Icon
          style={styles.messageButton}
          name="send"
          type="material"
          color="#0084ff"
          onPress={postMessage}
        />
        {error && <Text style={styles.errorMessage}>{error}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  channelTitle: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    margin: 10,
  },
  goBackButton: {
    flex: 1,
    margin : 10,
  },
  channelName: {
    color: "#ffffff",
    fontSize: 20,
  },
  messageItem: {
    flex: 8,
    backgroundColor: "#000000",
    justifyContent: "center",
    borderRadius: 5,
    margin: 4,
    padding: 4,
  },
  textMessage: {
    color: "#ffffff",
    fontSize: 15,
    margin: 5,
    flexWrap: "wrap",
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#0084ff',
    borderBottomRightRadius: 12,
    maxWidth: 80 + "%",
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#6f6f6f',
    borderTopLeftRadius: 12,
    maxWidth: 80 + "%",
  },
  textSender: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  senderName: {
    color: "#ffffff",
    fontSize: 10,
    marginLeft: 5,
  },
  sendItem: {
    flex: 1,
    backgroundColor: "#000000",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  messageInput: {
    height: 40,
    width: 80 + "%",
    borderColor: "gray",
    borderWidth: 1,
    color: "#ffffff",
    borderRadius: 5,
    padding: 5,
  },
  messageButton: {
    marginLeft: 10,
  },
  errorMessage: {
    color: "#ff0000",
    fontSize: 15,
    margin: 5,
  },
});

export default Channel;
