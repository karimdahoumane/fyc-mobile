import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { API_URL } from "../Utils/Constants";
import { AuthContext } from "../Utils/Constants";

const Login = ({navigation}) => {
  const { login } = React.useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.welcomeView}>
        <Text style={styles.welcomeText}>Welcome to the Login Page</Text>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username"
          placeholderTextColor="#003f5c"
          onChangeText={(username) => setUsername(username)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TouchableOpacity style={styles.loginBtn} onPress={() => login(username, password, setError, API_URL)}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerBtn} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>REGISTER</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "60%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  welcomeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "60%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
  loginText: {
    color: "#fff",
    fontWeight: "bold",
  },
  registerBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
  registerText: {
    color: "#fff",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
  },
});

export default Login;
