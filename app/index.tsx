import { AGREEMENT_KEY, getData } from "@/storage";
import { router } from "expo-router";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function RootPage() {
  React.useEffect(() => {
    const init = async () => {
      const local = await getData(AGREEMENT_KEY);
      if (local === "yes") {
        router.replace("/home");
      } else {
        router.replace("/modal");
      }
    };
    init();
  }, []);

  return (
    <View style={styles.centeredView}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
