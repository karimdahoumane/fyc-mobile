import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "../Utils/Constants";

const Register = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      const response = await fetch(API_URL + "users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          nickname,
          password,
        }),
      });
      const json = await response.json();
      if (json.email) {
        navigation.navigate("Login");
        setEmail("");
        setNickname("");
        setPassword("");
        setError("");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const navigateToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.welcomeView}>
        <Text style={styles.welcomeText}>fyc-mobile app</Text>
      </View>
      <View style={styles.formView}>
        <Text style={styles.titleForm}>Register</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Nickname"
            placeholderTextColor="#003f5c"
            onChangeText={(nickname) => setNickname(nickname)}
          />
        </View>
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
          style={styles.registerBtn}
          onPress={handleRegister}
        >
          <Text style={styles.registerText}>REGISTER</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={navigateToLogin}
        >
          <Text style={styles.loginText}>You already have an account ? Login.</Text>
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
  registerBtn: {
    width: 90 + "%",
    backgroundColor: "#0084ff",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  registerText: {
    color: "white",
  },
  loginText: {
    color: "white",
    fontSize: 15,
    marginTop: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default Register;
