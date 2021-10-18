import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Share,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import Styles from "../styles/globalStyle";
import CameraRoll from "@react-native-community/cameraroll";

const CardScreen = ({ item }) => {
  const letsShare = async () => {
    try {
      const result = await Share.share({
        message: `Checkout this amazing meme: https://www.reddit.com${item.permalink}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(activityType);
        } else {
          console.log("Shared");
        }
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const letsDownload = async () => {
    const url = item.url.split("/");
    const pathName = url[url.length - 1];
    let permissions = await MediaLibrary.requestPermissionsAsync();
    if (!permissions.granted) {
      alert("permissions required");
    }
    if (permissions.granted) {
      const download = FileSystem.downloadAsync(
        item.url,
        FileSystem.documentDirectory + pathName
      )
        .then(async ({ uri }) => {
          try {
            const asset = await MediaLibrary.createAssetAsync(uri);
            await MediaLibrary.createAlbumAsync("MemeHub", asset, false);
            alert("Saved in pictures");
          } catch (error) {
            console.log(error);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <View style={Styles.cardBox}>
      <Card>
        <Card.Title>{item.title}</Card.Title>
        <Card.Divider />
        <Card.Image
          onPress={() =>
            Linking.openURL(`https://www.reddit.com` + item.permalink)
          }
          style={Styles.cardImageStyle}
          source={{ uri: `${item.url}` }}
        ></Card.Image>
        <Text style={{ marginBottom: 10 }}>SubReddit: {item.subReddit}</Text>
        <Text style={{ marginBottom: 10 }}>Posted by: {item.author}</Text>
        <Button
          onPress={letsShare}
          icon={<Icon name="share" type="FontAwesome" />}
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
        />
        <Button
          onPress={letsDownload}
          icon={<FontAwesome name="download" size={24} color="black" />}
          buttonStyle={{
            marginTop: 10,
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
