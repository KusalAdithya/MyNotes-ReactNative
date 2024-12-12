import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  Button,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  Dimensions,
  Animated,
  View,
  TextInput,
  FlatList,
  Image,
  Alert,
  TouchableOpacity,
  BackHandler,
} from "react-native";

export function HomeUi({ navigation }) {
  const [getData, setData] = useState([]);

  loadData();

  async function loadData() {
    const cardDetails = {
      mobile: await AsyncStorage.getItem("mobile"),
    };

    fetch("http://10.0.2.2/MyNotes/cardDetailsProcess.php", {
      method: "POST",
      header: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify(cardDetails),
      

    })
      .then((response) => {
        return response.json();
      })
      .then((text) => {
        setData(text);
      })
      .catch((error) => {
        Alert.alert("Warning",error);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#7d6bea" barStyle="light-content" />

      <View style={styles.mainView}>
        <View style={styles.compView}>
          <FlatList data={getData} renderItem={CardUi} />
        </View>
      </View>
      <View style={styles.newNoteView}>
        <View style={styles.btnView}>
          <Pressable
            onPress={() => {
              navigation.navigate("New Note");
            }}
            style={styles.btnNewNote}
          >
            <Image
              source={require("./assets/Images/newNote.png")}
              style={{ width: 55, height: 55 }}
            />
          </Pressable>
        </View>
      </View>

      <View style={styles.logOutView}>
        <View style={styles.btnView}>
          <Pressable
            onPress={async () => {
              await AsyncStorage.removeItem("mobile");
              navigation.navigate("Sign In");
            }}
            style={styles.btnLogOut}
          >
            <Image
              source={require("./assets/Images/logOut.png")}
              style={{ width: 42, height: 42 }}
            />
          </Pressable>
          
        </View>
      </View>
    </SafeAreaView>
  );

  function CardUi({ item }) {
    let imgPath;

    let categoryName = new Array(item.name);

    if (categoryName == "Study") {
      imgPath = require("./assets/Images/study.png");
    } else if (categoryName == "Travel") {
      imgPath = require("./assets/Images/travel.png");
    } else if (categoryName == "Personal") {
      imgPath = require("./assets/Images/personal.png");
    } else if (categoryName == "Work") {
      imgPath = require("./assets/Images/work.png");
    }

    const ui = (
      <TouchableOpacity
        style={styles.cardView}
        onPress={() => {
          navigation.navigate("View Note", item);
        }}
      >
        <View style={styles.cardImage}>
          <Image source={imgPath} style={{ width: 50, height: 50 }} />
        </View>
        <View style={styles.cardData}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {item.title}
          </Text>
          <View style={styles.btnCategory}>
            <Text numberOfLines={1} style={styles.btnTextCat}>
              {item.name}
            </Text>
          </View>
        </View>

        <View style={styles.cardDate}>
          <Text style={{ color: "#382d74" }}>{item.date}</Text>
        </View>
      </TouchableOpacity>
    );
    return ui;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  btnNote: {
    backgroundColor: "#1F45FC",
    Text: "center",
    borderRadius: 10,
    width: 100,
    alignItems: "flex-end",
  },
  btnText: {
    padding: 6,
    fontSize: 15,
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
  },
  compView: {
    marginVertical: 5,
  },
  mainView: {
    flex: 1,
    padding: 5,
    width: "auto",
    marginTop: 10,
  },
  btnNewNote: {
    Text: "center",
    borderRadius: 30,
    width: 50,
    alignItems: "center",
    paddingVertical: 5,
    fontWeight: "bold",
  },
  btnView: {
    marginVertical: 10,
    alignItems: "center",
  },
  newNoteView: {
    position: "absolute",
    bottom: 1,
    alignSelf: "center",
    right: 20,
  },
  cardView: {
    flexDirection: "row",
    width: 370,
    height: 80,
    backgroundColor: "#e2defa",
    marginBottom: 10,
    borderRadius: 15,
    alignItems: "center",
    padding: 10,
  },
  cardImage: {
    backgroundColor: "white",
    Text: "center",
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "auto",
  },
  cardData: {
    marginStart: 10,
    flex: 2,
  },
  cardDate: {
    marginTop: 40,
    alignItems: "flex-end",
    bottom: 1,
    flex: 2,
    justifyContent: "center",
  },
  btnLogOut: {
    Text: "center",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  logOutView: {
    position: "absolute",
    bottom: 75,
    alignSelf: "center",
    right: 22,
  },
  btnTextCat: {
    padding: 1,
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    justifyContent: "center",
    marginHorizontal: "auto",
  },
  btnCategory: {
    borderColor:"#7d6bea",
    borderWidth:2,
    borderStyle:"solid",
    backgroundColor: "#7d6bea",
    borderRadius:100,
    alignItems: "center",
    alignContent: "center",
    width:80,
    height:"auto",
    justifyContent: "center",
    marginStart:-3,
    marginTop:2
  },
});

/////////////----------------Disable back button----------------//////////////
// useFocusEffect(
// React.useCallback(() => {
//   const onBackPress = () => {
//     // Do Whatever you want to do on back button click
//     // Return true to stop default back navigaton
//     // Return false to keep default back navigaton
//     return true;
//   };

//   BackHandler.addEventListener("hardwareBackPress", onBackPress);

//   return () =>
//     BackHandler.removeEventListener("hardwareBackPress", onBackPress);
// }, [])
// );
/////////////----------------Disable back button----------------//////////////
