import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { getToken, storeToken, removeToken } from "./src/Auth/TokenProvider";
import Login from "./src/Auth/Login";
import Register from "./src/Auth/Register";
import HomeScreen from "./src/Views/HomeScreen";
import SplashScreen from "./src/Views/SplashScreen";
import MenuOptions from "./src/Components/MenuOptions";
import { AuthContext } from "./src/Utils/Constants";

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}

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
          const response = await fetch(API_URL+"auth/login", {
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
        <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false}}>
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.userToken == null ? (
            // No token found, user isn't signed in
            <Stack.Screen 
              name="Auth" 
              component={AuthStack}
              options={{
                title: 'Authentication',
                // When logging out, a pop animation feels intuitive
                animationTypeForReplace: state.isLogout ? 'pop' : 'push',
              }} />
          ) : (
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{
              title: 'My home',
              headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerShown: true,
              headerRight: () => <MenuOptions />
            }}/>
          )}
        </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
  );
}
export default App;
