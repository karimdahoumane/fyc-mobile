import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { View } from "react-native";
import { useEffect } from "react";
import { API_URL } from "../Utils/Constants";
import { getToken } from "../Auth/TokenProvider";
import { getCurrentUser } from "../Auth/AuthProvider";



const Profile = () => {
  const [email, setEmail] = React.useState("");
  const [nickname, setNickname] = React.useState("");
  const [error, setError] = React.useState("");

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const user = await getCurrentUser()
        const response = await fetch(API_URL + "users/" + user.sub, {
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleItem}>
        <Text style={styles.titleText}>Mon profil</Text>
      </View>
      <View style={styles.editItem}>
      <Text style={styles.labelItem}>Email</Text>
      <TextInput style={styles.textInput}
        onChangeText={setEmail}
        value={email}
        disabled
      />
      <Text style={styles.labelItem}>Pseudo</Text>
      <TextInput style={styles.textInput}
        onChangeText={setNickname}
        value={nickname}
        disabled
      />
      <Text style={{ color: "red" }}>{error}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  titleItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ffffff",
  },
  editItem: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  labelItem: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#ffffff",
  },
  textInput: {
    height: 40,
    width: 300,
    borderColor: "#111111",
    backgroundColor: "#c2e0f4",
    borderWidth: 1,
    marginBottom: 20,
  },

  
});

export default Profile;
