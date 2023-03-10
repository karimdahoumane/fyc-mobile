import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthContext } from "./src/Auth/AuthContext";
import Login from "./src/Auth/Login";
import Logout from "./src/Auth/Logout";
import Register from "./src/Auth/Register";
import Home from "./src/Screens/Home";
import Profile from "./src/Screens/Profile";
import Channel from "./src/Screens/Channel";
import Splash from "./src/Screens/Splash";
import ChannelAdd from "./src/Screens/ChannelAdd";
import ChannelEdit from "./src/Screens/ChannelEdit";
import { removeToken, storeToken } from "./src/Auth/TokenProvider";
import { Icon } from "react-native-elements";
import { View } from "react-native";

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <AuthStack.Screen
      name="Login"
      component={Login}
      options={{ title: "Sign In" }}
    />
    <AuthStack.Screen
      name="Register"
      component={Register}
      options={{ title: "Create Account" }}
    />
  </AuthStack.Navigator>
);

const Tabs = createBottomTabNavigator();

const HomeStack = createStackNavigator();
const ChannelAddStack = createStackNavigator();
const ChannelEditStack = createStackNavigator();
const ChannelStack = createStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <HomeStack.Screen name="Home" component={Home} />
    <ChannelStack.Screen name="Channel" component={Channel} />
    <ChannelAddStack.Screen name="ChannelAdd" component={ChannelAdd} />
    <ChannelEditStack.Screen name="ChannelEdit" component={ChannelEdit} />
  </HomeStack.Navigator>
);

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => (
  <ProfileStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
);

const TabsScreen = () => (
  <Tabs.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === "Home") {
          iconName = "home";
        } else if (route.name === "Profile") {
          iconName = "person";
        }
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "#0084ff",
      tabBarInactiveTintColor: "gray",
      tabBarStyle: {
        backgroundColor: "#000",
      },
      headerBackground: () => <View style={{ backgroundColor: "#000000" }} />,
      headerBackgroundContainerStyle: {
        backgroundColor: "#000000",
      },
      headerTintColor: "#000",
      headerRight: () => <Logout />,
    })}
  >
    <Tabs.Screen name="Home" component={HomeStackScreen} />
    <Tabs.Screen name="Profile" component={ProfileStackScreen} />
  </Tabs.Navigator>
);

const RootStack = createStackNavigator();
const RootStackScreen = ({ userToken }) => (
  <RootStack.Navigator screenOptions={{ headerShown: false }}>
    {userToken ? (
      <RootStack.Screen name="App" component={TabsScreen} />
    ) : (
      <RootStack.Screen name="Auth" component={AuthStackScreen} />
    )}
  </RootStack.Navigator>
);

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);
  const [error, setError] = React.useState(null);

  const authContext = React.useMemo(
    () => ({
      login: async (username, password, API_URL) => {
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
            setError("Invalid email or password");
            return;
          } else {
            const json = await response.json();
            if (json.access_token) {
              await storeToken(json.access_token);
              setUserToken(json.access_token);
              setIsLoading(false);
            }
          }
        } catch (error) {
          console.error(error);
        }
      },
      logout: () => {
        setIsLoading(false);
        setUserToken(null);
        removeToken();
      },
      error: error,
    }),
    [error]
  );

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [userToken]);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken={userToken} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
