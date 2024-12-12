import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Alert,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";

export function SignUpUi({ navigation }) {
  const [getMobile, setMobile] = useState("");
  const [getFname, setFname] = useState("");
  const [getLname, setLname] = useState("");
  const [getPassword, setPassword] = useState("");

  const clearFields = (val) => {
    setMobile("");
    setFname("");
    setLname("");
    setPassword("");
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Student", value: "1" },
    { label: "Employee", value: "2" },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#7d6bea"  barStyle="light-content"/>
      <View style={styles.mainView}>
        <View style={styles.compView}>
          <Text style={styles.mainText}>Select User Type</Text>
          <DropDownPicker
            style={styles.mainText}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            textStyle={styles.dropDownText}
          />
        </View>
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
          <Text style={styles.mainText}>First Name</Text>
          <TextInput
            style={styles.textInput}
            value={getFname}
            onChangeText={(text) => setFname(text)}
          />
        </View>
        <View style={styles.compView}>
          <Text style={styles.mainText}>Last Name</Text>
          <TextInput
            style={styles.textInput}
            value={getLname}
            onChangeText={(text) => setLname(text)}
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
                userType: value,
                mobile: getMobile,
                fname: getFname,
                lname: getLname,
                password: getPassword,
              };

              fetch("http://10.0.2.2/MyNotes/signUpProcess.php", {
                method: "POST",
                body: JSON.stringify(details),
              })
                .then((response) => {
                  return response.text();
                })
                .then((text) => {
                  if (text == "Success") {
                    clearFields(getMobile, getFname, getLname, getPassword);
                    navigation.navigate("Sign In");
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
            <Text style={styles.btnText}>{"SIGN UP"}</Text>
          </Pressable>
        </View>
        <View style={styles.btnView}>
          <Pressable
            onPress={() => {
              navigation.navigate("Sign In");
            }}
            style={styles.btnSignup}
          >
            <Text style={styles.btnTextSignUp}>{"SIGN IN"}</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
  dropDownText:{
    fontSize: 17,
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
  btnSign: {
    backgroundColor: "#7d6bea",
    Text: "center",
    borderRadius: 100,
    width: 150,
    height:40,
    alignItems: "center",
    justifyContent:"center"
  },
  btnText: {
    padding: 6,
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  btnView: {
    marginVertical: 10,
    alignItems: "center",
  },
  btnTextSignUp: {
    padding: 6,
    fontSize: 17,
    fontWeight: "bold",
    color: "#5948ba",
  },
  btnSignup: {
    backgroundColor: "#d4cef8",
    Text: "center",
    borderRadius: 100,
    width: 100,
    width: 150,
    height:40,
    alignItems: "center",
    justifyContent:"center"
  },
});
