import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList } from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import Styles from "../styles/globalStyle";
import CardScreen from "./CardScreen";
import HeaderScreen from "./HeaderScreen";

const homeScreen = () => {
  const [totalPost, setTotalPost] = useState(0);
  const [data, setData] = useState([]);
  const [after, setAfter] = useState("");

  const getMyMemes = async () => {
    let arr = [];
    const apiRawData = await fetch(
      `https://www.reddit.com/r/dankmeme/new.json?after=${after}`
    );
    const parsedData = await apiRawData.json();
    setAfter(parsedData.data.after);
    const postDetails = parsedData.data.children;
    setTotalPost(parsedData.data.dist);
    postDetails.forEach((item) => {
      const detailsToShow = {
        title: item.data.title,
        url: item.data.url,
        subReddit: item.data.subreddit_name_prefixed,
        permalink: item.data.permalink,
        author: item.data.author,
      };
      arr.push(detailsToShow);
    });
    setData(data.concat(arr));
  };

  useEffect(() => {
    getMyMemes();
  }, []);

  return (
    <>
      <HeaderScreen />
      {data && (
        <>
          <FlatList
            data={data}
            renderItem={CardScreen}
            keyExtractor={(item) => item.permalink}
          />
          <Button title="Next" raised onPress={getMyMemes} />
        </>
      )}
    </>
  );
};

export default homeScreen;
