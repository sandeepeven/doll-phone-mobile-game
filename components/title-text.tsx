import { Colors } from "@/styles";
import React from "react";
import { StyleSheet, Text } from "react-native";

type TitleTextProps = {
  content: string;
};

function TitleText({ content }: TitleTextProps) {
  return <Text style={styles.textStyle}>{content}</Text>;
}

export { TitleText };

const styles = StyleSheet.create({
  textStyle: {
    marginTop: 30,
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.yellow,
  },
});
