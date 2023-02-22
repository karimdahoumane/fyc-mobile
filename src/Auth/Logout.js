import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { AuthContext } from "./AuthContext";
import { Text } from "react-native";

const Logout = () => {
  const { logout } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={logout}>
        <Text style={styles.textItem}>Logout</Text>
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
  textItem: {
    flex: 1,
    color: "white",
    fontSize: 20,
  },
});
export default Logout;
