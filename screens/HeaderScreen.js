import React from "react";
import { View, Text } from "react-native";
import { Header, Icon } from "react-native-elements";

const HeaderScreen = () => {
  return (
    <Header
      centerComponent={{
        text: "Memes FTW",
        style: { color: "#fff", fontSize: 30 },
      }}
    />
  );
};

export default HeaderScreen;
