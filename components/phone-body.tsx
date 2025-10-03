import { Colors } from "@/styles";
import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { ThemedView } from "./themed-view";

type PhoneBodyProps = PropsWithChildren & {};

function PhoneBody({ children }: PhoneBodyProps) {
  return (
    <ThemedView style={styles.bodyStyle}>
      <View style={styles.bodyOutlineStyle}>{children}</View>
    </ThemedView>
  );
}

export { PhoneBody };

const styles = StyleSheet.create({
  bodyStyle: {
    flex: 1,
    borderRadius: 4,
    backgroundColor: Colors.background,
    padding: 8,
  },
  bodyOutlineStyle: {
    flex: 1,
    justifyContent: "flex-end",
    borderRadius: 20,
    borderWidth: 5,
    padding: 8,
  },
});
