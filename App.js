
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

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator>
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
const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={Home} options={{ title: "Home",
  
  headerRight: () => (
    <Logout />
  ) }}/>
    <ChannelStack.Screen name="Channel" component={Channel} />
    <ChannelAddStack.Screen name="ChannelAdd" component={ChannelAdd} />
    <ChannelEditStack.Screen name="ChannelEdit" component={ChannelEdit} />
  </HomeStack.Navigator>
);

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
);

const ChannelStack = createStackNavigator();
const ChannelStackScreen = () => (
  <ChannelStack.Navigator>
    <ChannelStack.Screen name="Channel" component={Channel} />
  </ChannelStack.Navigator>
);

const TabsScreen = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="Home" component={HomeStackScreen} options={{ headerShown: false }} />
    <Tabs.Screen name="Profile" component={ProfileStackScreen} options={{ headerShown: false }} />
  </Tabs.Navigator>
);

const RootStack = createStackNavigator();
const RootStackScreen = ({ userToken }) => (
  <RootStack.Navigator headerMode="none">
    {userToken ? (
      <RootStack.Screen
        name="App"
        component={TabsScreen}
      />    
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{
          animationEnabled: false
        }}
      />
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
            setError("Invalid username or password");
            return;
          } else {
            const json = await response.json();
            if (json.access_token) {
              await storeToken(json.access_token)
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
    }),
    []
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
