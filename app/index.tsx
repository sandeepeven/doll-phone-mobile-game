import { AGREEMENT_KEY, getData } from "@/storage";
import { Colors } from "@/styles";
import { Redirect, type Href } from "expo-router";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function RootPage() {
  const [target, setTarget] = React.useState<Href | null>(null);

  React.useEffect(() => {
    getData(AGREEMENT_KEY).then((value) =>
      setTarget(value === "yes" ? "/home" : "/modal")
    );
  }, []);

  if (target) {
    return <Redirect href={target} />;
  }

  return (
    <View style={styles.centeredView}>
      <ActivityIndicator size="large" color={Colors.shell} />
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
});
