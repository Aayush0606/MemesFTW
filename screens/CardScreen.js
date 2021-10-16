import React from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import Styles from "../styles/globalStyle";

const CardScreen = ({ item }) => {
  const url = item.url;
  return (
    <View style={Styles.cardBox}>
      <Card>
        <Card.Title>{item.title}</Card.Title>
        <Card.Divider />
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(`https://www.reddit.com` + item.permalink)
          }
        >
          <Card.Image
            style={Styles.cardImageStyle}
            source={{ uri: `${item.url}` }}
          ></Card.Image>
        </TouchableOpacity>
        <Text style={{ marginBottom: 10 }}>SubReddit: {item.subReddit}</Text>
        <Text style={{ marginBottom: 10 }}>Posted by: {item.author}</Text>
        <Button
          icon={<Icon name="share" type="FontAwesome" />}
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
        />
      </Card>
    </View>
  );
};

export default CardScreen;
