import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

type PhoneButtonContainerProps = PropsWithChildren & {};

function PhoneButtonContainer({ children }: PhoneButtonContainerProps) {
  return <View style={styles.phoneButtonContainerStyle}>{children}</View>;
}

export { PhoneButtonContainer };

const styles = StyleSheet.create({
  phoneButtonContainerStyle: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
