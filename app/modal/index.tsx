import { AGREEMENT_KEY, storeData } from "@/storage";
import { Colors, Fonts, shade } from "@/styles";
import { router } from "expo-router";
import React from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const POLICY_URL =
  "https://www.freeprivacypolicy.com/live/34c06d58-0432-4c6a-9faf-3f84cf735416";

export default function AgreementScreen() {
  const openPolicy = () => {
    Linking.openURL(POLICY_URL).catch(() => {});
  };

  const agree = async () => {
    await storeData("yes", AGREEMENT_KEY);
    router.replace("/home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.emoji}>📱</Text>
        <Text style={styles.title}>Hi, grown-ups!</Text>
        <Text style={styles.body}>
          Doll Phone is a toy phone that plays fun sounds. Please read and
          agree to our privacy policy before handing it to your little one.
        </Text>
        <Pressable
          onPress={openPolicy}
          accessibilityRole="link"
          hitSlop={8}
          style={styles.link}
        >
          <Text style={styles.linkText}>Read the Privacy Policy</Text>
        </Pressable>
        <Pressable
          onPress={agree}
          accessibilityRole="button"
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>I agree, let&apos;s play!</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: Colors.background,
  },
  card: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 420,
    alignItems: "center",
    padding: 28,
    borderRadius: 32,
    backgroundColor: Colors.white,
    borderBottomWidth: 8,
    borderBottomColor: Colors.backgroundDots,
  },
  emoji: {
    fontSize: 64,
  },
  title: {
    marginTop: 8,
    fontFamily: Fonts.bold,
    fontSize: 28,
    color: Colors.ink,
  },
  body: {
    marginTop: 12,
    fontFamily: Fonts.medium,
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
    color: Colors.inkSoft,
  },
  link: {
    marginTop: 16,
    paddingVertical: 8,
  },
  linkText: {
    fontFamily: Fonts.semiBold,
    fontSize: 17,
    color: Colors.shellEdge,
    textDecorationLine: "underline",
  },
  button: {
    marginTop: 16,
    alignSelf: "stretch",
    paddingVertical: 16,
    borderRadius: 24,
    backgroundColor: Colors.shell,
    borderBottomWidth: 6,
    borderBottomColor: shade(Colors.shell, 0.25),
  },
  buttonPressed: {
    borderBottomWidth: 2,
    marginTop: 20,
  },
  buttonText: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    textAlign: "center",
    color: Colors.white,
  },
});
