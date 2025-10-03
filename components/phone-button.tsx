import { Colors } from "@/styles";
import React from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

type PhoneButtonProps = {
  content: string;
  signContent: string;
  onPressPlay: () => void;
};

function PhoneButton({ content, signContent, onPressPlay }: PhoneButtonProps) {
  const [pressed, setPress] = React.useState(false);
  return (
    <TouchableWithoutFeedback
      onPress={onPressPlay}
      onPressIn={() => setPress(true)}
      onPressOut={() => setPress(false)}
    >
      <View
        style={[
          styles.bodyStyle,
          pressed && { transform: [{ translateY: 5 }] },
        ]}
      >
        <Text style={styles.textStyle}>{content}</Text>
        <Text style={styles.signContentStyle}>{signContent}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

export { PhoneButton };

const styles = StyleSheet.create({
  bodyStyle: {
    width: 90,
    height: 55,
    margin: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderRadius: 25,
    backgroundColor: Colors.white,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },
  textStyle: {
    color: Colors.darkPink,
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    marginRight: 8,
  },
  signContentStyle: {
    fontSize: 14,
  },
});
