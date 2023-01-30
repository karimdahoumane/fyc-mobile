import react from "react";
import { View, Text, Button } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "../Utils/Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import { TextInput } from "react-native";
import { getToken } from "../Auth/TokenProvider";

const ProfileItem = () => {
  const [user, setUser] = useState({});
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL + "users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await getToken()),
          },
        });
        const json = await response.json();
        setUser(json);
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

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      navigation.navigate("Login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.profileView}>
      <Image
        style={{ width: 200, height: 200, borderRadius: 100 }}
        source={{ uri: user.imageUrl }}
      />
      <Text style={{ color: "white", fontSize: 20, marginTop: 20 }}>
        {user.username}
      </Text>
      <Text style={{ color: "white", fontSize: 20, marginTop: 20 }}>
        {user.bio}
      </Text>
      <TextInput
        style={{
          height: 40,
          width: 200,
          borderColor: "gray",
          borderWidth: 1,
          marginTop: 20,
        }}
        onChangeText={setNickname}
        value={nickname}
      />
      <Button title="Update" onPress={handleUpdate} />
      <Button title="Logout" onPress={handleLogout} />
      <Text style={{ color: "red" }}>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#003f5c",
  },
  profileView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#003f5c",
  },
});

export default ProfileItem;
