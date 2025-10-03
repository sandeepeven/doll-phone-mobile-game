import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { AGREEMENT_KEY, storeData } from "@/storage";
import { Link, router } from "expo-router";
import React from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";

const POLICY_URL =
  "https://www.freeprivacypolicy.com/live/34c06d58-0432-4c6a-9faf-3f84cf735416";

export default function ModalScreen() {
  const openLink = () => {
    Linking.openURL(POLICY_URL);
  };
  const updateAgreement = async () => {
    await storeData("yes", AGREEMENT_KEY);
    router.replace("/home");
  };
  return (
    <ThemedView style={styles.container}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            Please agree to our privacy policy to continue
          </Text>
          <Link href="/" dismissTo style={styles.link}>
            <ThemedText type="link" onPress={openLink}>
              Privacy Policy
            </ThemedText>
          </Link>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={updateAgreement}
          >
            <ThemedText type="default" style={styles.textStyle}>
              I agree
            </ThemedText>
          </Pressable>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 20,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalUnderlineText: {
    textDecorationLine: "underline",
    textAlign: "center",
  },
});
