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
  const [email, setEmail] = useState("");
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
            placeholder="Email"
            placeholderTextColor="#003f5c"
            onChangeText={(email) => setEmail(email)}
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
          onPress={() => login(email, password, API_URL)}
        >
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.registerText}>Register on fyc-mobile app.</Text>
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
    fontSize: 17,
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
  registerText: {
    color: "white",
    fontSize: 15,
    marginTop: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default Login;
