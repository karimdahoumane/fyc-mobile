import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import ProfileItem from "../Components/ProfileItem";
import { useEffect, useState } from "react";

const ProfileScreen = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ProfileItem style={Styles.profileItem} />
      )}
    </View>
  );
};

const Styles = StyleSheet.create({
    profileItem: {
        flex: 1,
    },
});

export default ProfileScreen;

