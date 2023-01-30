import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { getToken, storeToken, removeToken } from "./src/Auth/TokenProvider";
import Login from "./src/Auth/Login";
import Register from "./src/Auth/Register";
import HomeScreen from "./src/Views/HomeScreen";
import ProfileScreen from "./src/Views/ProfileScreen";
import SplashScreen from "./src/Views/SplashScreen";
import { AuthContext } from "./src/Utils/Constants";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const MyTheme = {
  dark: false,
  colors: {
    primary: "rgb(255, 45, 85)",
    background: "rgb(242, 242, 242)",
    card: "rgb(255, 255, 255)",
    text: "rgb(28, 28, 30)",
    border: "rgb(199, 199, 204)",
    notification: "rgb(255, 69, 58)",
  },
};

const Tab = createBottomTabNavigator();

const HomeTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home" headerMode="none">
      <Stack.Screen name="Home" component={HomeTab} />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login" headerMode="none">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

const Stack = createStackNavigator();

const App = ({ navigation }) => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          if (action.token) {
            storeToken(action.token);
          }
          return {
            ...prevState,
            isLogout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          removeToken();
          return {
            ...prevState,
            isLogout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isLogout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        await getToken();
      } catch (e) {
        console.log(e);
      }

      dispatch({ type: "RESTORE_TOKEN", token: state.userToken });
    };
    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      login: async (username, password, setError, API_URL) => {
        try {
          const response = await fetch(API_URL + "auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username,
              password: password,
            }),
          });
          if (!response.ok) {
            setError("Invalid username or password");
            return;
          } else {
            const json = await response.json();
            if (json.access_token) {
              dispatch({ type: "SIGN_IN", token: json.access_token });
              setError("");
            }
          }
        } catch (error) {
          console.error(error);
        }
      },
      logout: () => dispatch({ type: "SIGN_OUT" }),
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.userToken == null ? (
            // No token found, user isn't signed in
            <Stack.Screen
              name="Auth"
              component={AuthStack}
              options={{
                title: "Authentication",
                // When logging out, a pop animation feels intuitive
                animationTypeForReplace: state.isLogout ? "pop" : "push",
              }}
            />
          ) : (
            <Stack.Screen
              name="HomeScreen"
              component={AppStack}
              options={{
                title: "Home",
                // When logging out, a pop animation feels intuitive
                animationTypeForReplace: state.isLogout ? "pop" : "push",
              }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
export default App;
