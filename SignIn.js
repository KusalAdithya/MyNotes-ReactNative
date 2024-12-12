import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  Button,
  Pressable,
  View,
  TextInput,
  Alert,
} from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export function SignInUi({ navigation }) {

  async function logged() {
    const loggedMobile = await AsyncStorage.getItem("mobile");

    if (loggedMobile != null) {
      navigation.navigate("My Notes");
    }
  }
  
  useFocusEffect(
    ()=>{  logged();}
  );

  const [getMobile, setMobile] = useState("");
  const [getPassword, setPassword] = useState("");

  const clearFields = (val) => {
    setMobile("");
    setPassword("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#7d6bea" barStyle="light-content" />

      <View style={styles.mainView}>
        <View style={styles.compView}>
          <Text style={styles.mainText}>Mobile Number</Text>
          <TextInput
            style={styles.textInput}
            value={getMobile}
            onChangeText={(text) => setMobile(text)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.compView}>
          <Text style={styles.mainText}>Password</Text>
          <TextInput
            style={styles.textInput}
            value={getPassword}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.btnView}>
          <Pressable
            onPress={() => {
              const details = {
                mobile: getMobile,
                password: getPassword,
              };

              fetch("http://10.0.2.2/MyNotes/signInProcess.php", {
                method: "POST",
                body: JSON.stringify(details),
              })
                .then((response) => {
                  return response.text();
                })
                .then((text) => {
                  if (text == "Success") {
                    clearFields(getMobile, getPassword);
                    saveDetails();
                    navigation.navigate("My Notes");
                  } else {
                    Alert.alert("Warning", text);
                  }
                })
                .catch((error) => {
                  Alert.alert("Error", error);
                });
            }}
            style={styles.btnSign}
          >
            <Text style={styles.btnText}>{"SIGN IN"}</Text>
          </Pressable>
        </View>
        <View style={styles.btnView}>
          <Pressable
            onPress={() => {
              navigation.navigate("Sign Up");
            }}
            style={styles.btnSignup}
          >
            <Text style={styles.btnTextSignUp}>{"SIGN UP"}</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );

  async function saveDetails() {
    await AsyncStorage.setItem("mobile", getMobile);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  btnSignup: {
    backgroundColor: "#d4cef8",
    Text: "center",
    borderRadius: 100,
    width: 100,
    width: 150,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    padding: 6,
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  textInput: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    padding: 5,
    borderRadius: 10,
    fontSize: 17,
  },
  mainText: {
    fontSize: 17,
    fontWeight: "bold",
  },
  compView: {
    marginVertical: 5,
  },
  mainView: {
    flex: 1,
    padding: 3,
    width: 350,
    marginTop: 20,
  },
  btnView: {
    marginVertical: 10,
    alignItems: "center",
  },
  btnSign: {
    backgroundColor: "#7d6bea",
    Text: "center",
    borderRadius: 100,
    width: 150,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  btnTextSignUp: {
    padding: 6,
    fontSize: 17,
    fontWeight: "bold",
    color: "#5948ba",
  },
});
