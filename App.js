import React from "react";
import Styles from "./styles/globalStyle";
import { StyleSheet, View } from "react-native";
import HomeScreen from "./screens/homeScreen";

export default function App() {
  return (
    <View style={Styles.AndroidSafeArea}>
      <HomeScreen />
    </View>
  );
}
