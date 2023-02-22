import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { AuthContext } from "./AuthContext";
import { Text } from "react-native";
import { Icon } from "react-native-elements";

const Logout = () => {
  const { logout } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutItem} onPress={logout}>
        <Text style={styles.textItem}>Logout</Text>
        <Icon name="logout" type="antdesign" color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingRight: 20,
  },
  logoutItem: {
    flexDirection: "row",
  },
  textItem: {
    flex: 1,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
  },
});
export default Logout;
