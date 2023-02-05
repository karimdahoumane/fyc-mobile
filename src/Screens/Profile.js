import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "react-native-elements";
import { View } from "react-native";
import { useEffect } from "react";
import { API_URL } from "../Utils/Constants";
import { getToken } from "../Auth/TokenProvider";



const Profile = () => {
  const [email, setEmail] = React.useState("");
  const [nickname, setNickname] = React.useState("");
  const [error, setError] = React.useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL + "users/13", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await getToken()),
          },
        });
        const json = await response.json();
        setEmail(json.email);
        setNickname(json.nickname);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleUpdate = async () => {
    try {
      const response = await fetch(API_URL + "users/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (await getToken()),
        },
        body: JSON.stringify({
          nickname,
        }),
      });
      const json = await response.json();
      if (json.nickname) {
        setError("");
      } else {
        setError("Something went wrong, please try again");
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleItem}>
        <Text style={styles.titleText}>Mon profil</Text>
      </View>
      <View style={styles.editItem}>
      <TextInput style={styles.textInput}
        onChangeText={setEmail}
        value={email}
        disabled
      />
      <TextInput style={styles.textInput}
        onChangeText={setNickname}
        value={nickname}
      />
      <Button style={styles.submitButton} title="Update" onPress={handleUpdate} />
      <Text style={{ color: "red" }}>{error}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  titleItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    color: "#FFFFFF",
    fontSize: 30,
  },
  editItem: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    height: 40,
    width: 300,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 20,
    color: "#FFFFFF",
  },
  submitButton: {
    marginTop: 20,
  },
  
});

export default Profile;
