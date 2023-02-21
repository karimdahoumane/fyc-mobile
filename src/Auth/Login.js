import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { API_URL } from "../Utils/Constants";
import { AuthContext } from "./AuthContext";

const Login = ({ navigation }) => {
  const { login } = React.useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.welcomeView}>
        <Text style={styles.welcomeText}>fyc-mobile app</Text>
      </View>
      <View style={styles.formView}>
        <Text style={styles.titleForm}>Login</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Username"
            placeholderTextColor="#003f5c"
            onChangeText={(username) => setUsername(username)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => login(username, password, API_URL)}
        >
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.registerBtn}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.registerText}>REGISTER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeView: {
    flex: 1,
    justifyContent: "center",
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ffffff",
  },
  formView: {
    flex: 2,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  titleForm: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 40,
  },
  inputView: {
    backgroundColor: "#c2e0f4",
    borderRadius: 15,
    height: 50,
    marginBottom: 10,
    justifyContent: "center",
    padding: 20,
  },
  textInput: {
    height: 50,
    flex: 1,
    padding: 10,
    fontSize: 20,
  },
  loginBtn: {
    width: 90 + "%",
    backgroundColor: "#0084ff",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
  registerBtn: {
    width: 60 + "%",
    backgroundColor: "#fb5b5a",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  registerText: {
    color: "white",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default Login;
