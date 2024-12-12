import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeUi } from "./Home";
import { Button, Pressable, Text, Image, headerbackbutton } from "react-native";
import { SignUpUi } from "./SignUp";
import { SignInUi } from "./SignIn";
import { NewnoteUi } from "./NewNote";
import { ViewnoteUi } from "./ViewNote";

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Sign In"
          component={SignInUi}
          options={{
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 25,
              color: "white",
            },
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "#7d6bea",
            },
          }}
        />

        <Stack.Screen
          name="Sign Up"
          component={SignUpUi}
          options={{
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 25,
              color: "white",
            },
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "#7d6bea",
            },
          }}
        />

        <Stack.Screen
          name="My Notes"
          component={HomeUi}
          options={{
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 25,
              color: "white",
              
            },
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerBackVisible: false,
            headerStyle: {
              backgroundColor: "#7d6bea",
            },
          }}
        />

        <Stack.Screen
          name="New Note"
          component={NewnoteUi}
          options={{
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 25,
              color: "white",
            },
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "#7d6bea",
            },
          }}
        />

        <Stack.Screen
          name="View Note"
          component={ViewnoteUi}
          options={{
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 25,
              color: "white",
            },
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "#7d6bea",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
