import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList } from "react-native";
import { Card, ListItem, Button, Icon, SearchBar } from "react-native-elements";
import Styles from "../styles/globalStyle";
import CardScreen from "./CardScreen";
import HeaderScreen from "./HeaderScreen";

const homeScreen = () => {
  const [totalPost, setTotalPost] = useState(0);
  const [data, setData] = useState([]);
  const [after, setAfter] = useState("");
  const [search, setSearch] = useState("");
  const [index, setIndex] = useState(0);
  const [subReddit, setSubReddit] = useState("dankmeme");
  const [showNext, setShowNext] = useState(false);

  const getMyMemes = async () => {
    try {
      console.log("entered");
      let arr = [];
      const apiRawData = await fetch(
        `https://www.reddit.com/r/${subReddit}.json?after=${after}`
      );
      const parsedData = await apiRawData.json();
      if (parsedData.data.dist === 0) {
        console.log("Bad request");
      } else {
        setAfter(parsedData.data.after);
        const postDetails = parsedData.data.children;
        setTotalPost(parsedData.data.dist);
        postDetails.forEach((item) => {
          if (item.data.url) {
            const detailsToShow = {
              title: item.data.title,
              url: item.data.url,
              subReddit: item.data.subreddit_name_prefixed,
              permalink: item.data.permalink,
              author: item.data.author,
            };
            arr.push(detailsToShow);
          }
        });
        setData(data.concat(arr));
      }
    } catch (error) {
      setSubReddit("dankmeme");
      setSearch("");
      setAfter("");
      setData([]);
      console.log("error");
    }
  };

  useEffect(() => {
    getMyMemes();
  }, [subReddit]);

  return (
    <>
      <HeaderScreen />
      <SearchBar
        onSubmitEditing={() => {
          setData([]);
          setAfter("");
          setSubReddit(search);
          getMyMemes();
        }}
        placeholder="Search a subreddit..."
        onChangeText={(e) => setSearch(e)}
        value={search}
        containerStyle={{ backgroundColor: "black" }}
        inputContainerStyle={{ borderRadius: 50 }}
      />

      {data && (
        <>
          <FlatList
            data={data}
            renderItem={CardScreen}
            keyExtractor={(item) => item.permalink}
            onEndReached={() => {
              getMyMemes();
            }}
          />
        </>
      )}
      {showNext && <Button title="Next" raised onPress={getMyMemes} />}
    </>
  );
};

export default homeScreen;
