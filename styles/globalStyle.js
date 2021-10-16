import React from "react";
import { StyleSheet, View, Text, Platform, StatusBar } from "react-native";

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  cardImageStyle: {
    height: 435,
    overflow: "visible",
    resizeMode: "stretch",
  },
  cardBox: {
    marginTop: 10,
  },
});

export default Styles;
