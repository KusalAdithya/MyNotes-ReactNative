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
import AsyncStorage from "@react-native-async-storage/async-storage";

export function NewnoteUi({ navigation }) {
  const [getTitle, setTitle] = useState("");
  const [getNote, setNote] = useState("");

  const clearFields = (val) => {
    setTitle("");
    setNote("");
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Study", value: "1" },
    { label: "Travel", value: "2" },
    { label: "Personal", value: "3" },
    { label: "Work", value: "4" },
  ]);

  return (
    <SafeAreaView style={styles.container}>
       <StatusBar backgroundColor="#7d6bea"  barStyle="light-content"/>
      <View style={styles.mainView}>
        <View style={styles.compView}>
          <TextInput
            style={styles.textInputTitle}
            value={getTitle}
            onChangeText={(text) => setTitle(text)}
            placeholder="Title"
          />
        </View>
        <View style={styles.compViewDropDown}>
          <DropDownPicker
            style={styles.mainText}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            textStyle={styles.mainText}
            placeholder="Select a Category"
          />
        </View>
        <View style={styles.compView}>
          <TextInput
            style={styles.textInput}
            value={getNote}
            onChangeText={(text) => setNote(text)}
            editable
            multiline
            numberOfLines={21}
            textAlignVertical="top"
            placeholder="Write your own Note here"
          />
        </View>
        <View style={styles.btnView}>
          <Pressable
            onPress={async () => {
              const asyncmobile = await AsyncStorage.getItem("mobile");

              const details = {
                mobile:asyncmobile,
                category: value,
                title: getTitle,
                note: getNote,
              };

              fetch("http://10.0.2.2/MyNotes/NewNoteProcess.php", {
                method: "POST",
                body: JSON.stringify(details),
              })
                .then((response) => {
                  return response.text();
                })
                .then((text) => {
                  if (text == "Success") {
                    clearFields(getTitle, getNote);
                    navigation.navigate("My Notes");
                  } else {
                    Alert.alert("Warning", text);
                  }
                })
                .catch((error) => {
                  Alert.alert("Error", console.error(error));
                });
            }}
            style={styles.btnSign}
          >
            <Text style={styles.btnText}>{"SAVE NOTE"}</Text>
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
    padding: 10,
    borderRadius: 10,
    fontSize: 17,
  },
  mainText: {
    fontSize: 17,
  },
  compView: {
    marginVertical: 15,
  },
  mainView: {
    flex: 1,
    padding: 3,
    width: 350,
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
  textInputTitle: {
    borderStyle: "solid",
    borderBottomColor: "black",
    borderTopColor: "white",
    borderLeftColor: "white",
    borderRightColor: "white",
    borderWidth: 2,
    padding: 5,
    fontSize: 17,
  },
});
