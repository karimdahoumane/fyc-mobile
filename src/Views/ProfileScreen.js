import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import ProfileItem from "../Components/ProfileItem";

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mon profil</Text>
      <ProfileItem style={styles.profileItem} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  profileItem: {
    marginTop: 20,
  },
});

export default ProfileScreen;
