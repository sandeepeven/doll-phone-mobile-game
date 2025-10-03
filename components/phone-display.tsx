import React, { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

type PhoneDisplayProps = PropsWithChildren & {};

function PhoneDisplay({ children }: PhoneDisplayProps) {
  return <View style={styles.bodyStyle}>{children}</View>;
}

export { PhoneDisplay };

const styles = StyleSheet.create({
  bodyStyle: {
    flex: 1,
    marginTop: 25,
    alignItems: "center",
  },
});
