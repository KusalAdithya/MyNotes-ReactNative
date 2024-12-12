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
import { useState } from "react";

export function ViewnoteUi({ navigation, route }) {
  const [getTitle, setTitle] = useState(route.params.title);
  const [getNote, setNote] = useState(route.params.description);
  const [getcategry, setCategory] = useState(route.params.name);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#7d6bea" barStyle="light-content" />
      <View style={styles.mainView}>
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
          }}
        >
          <View>
            <Text
              style={{ fontSize: 25, fontWeight: "bold" }}
              onChangeText={(text) => setTitle(text)}
              editable={false}
              color={"black"}
            >
              {getTitle}
            </Text>
          </View>
        </View>

        <View style={styles.categoryView}>
          <View style={styles.btnCategory}>
            <Text style={styles.btnTextCat}>{getcategry}</Text>
          </View>
        </View>

        <View style={styles.compView}>
          <TextInput
            style={styles.textInput}
            value={getNote}
            onChangeText={(text) => setNote(text)}
            multiline
            numberOfLines={24}
            textAlignVertical="top"
            editable={false}
            color={"black"}
          />
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
    borderColor: "white",
    padding: 10,
    borderRadius: 10,
    fontSize: 17,
    backgroundColor: "#eae7fc",
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
  btnTextCat: {
    padding: 2,
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
  },
  btnCategory: {
    borderStyle: "solid",
    backgroundColor: "#7d6bea",
    borderRadius: 100,
    alignItems: "center",
    width: 70,
    height: 25,
    justifyContent: "center",
  },
  categoryView: {
    marginTop: 8,
  },
});
