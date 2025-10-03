import React from "react";
import { Image, StyleSheet } from "react-native";

type DisplayCoverProps = {
  src: string;
};

function DisplayCover({ src }: DisplayCoverProps) {
  return <Image source={{ uri: src }} style={styles.coverStyle} />;
}

export { DisplayCover };

const styles = StyleSheet.create({
  coverStyle: {
    height: 250,
    width: 300,
    borderRadius: 25,
    resizeMode: "contain",
  },
});
