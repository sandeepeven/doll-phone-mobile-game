import { PhoneBody, PhoneDisplay, PhoneKeypad } from "@/components";
import { phoneKeys, type PhoneKey } from "@/constants/phone-keys";
import { useSoundBoard } from "@/lib/audio-player";
import { Colors } from "@/styles";
import React from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const MAX_PHONE_WIDTH = 460;
const SCREEN_PADDING = 16;
const SHELL_PADDING = 18;
const KEY_GAP = 12;
const KEY_ROWS = Math.ceil(phoneKeys.length / 3);

export default function HomeScreen() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { play, isPlaying } = useSoundBoard();
  const [activeKey, setActiveKey] = React.useState<PhoneKey | null>(null);
  const [tapCount, setTapCount] = React.useState(0);

  const phoneWidth = Math.min(width - SCREEN_PADDING * 2, MAX_PHONE_WIDTH);
  const keyWidth = (phoneWidth - SHELL_PADDING * 2 - KEY_GAP * 2) / 3;
  // Give the keypad at most half of the usable height so the screen stays roomy.
  const usableHeight = height - insets.top - insets.bottom;
  const keyHeight = Math.min(
    keyWidth * 0.72,
    (usableHeight * 0.5 - KEY_GAP * (KEY_ROWS - 1)) / KEY_ROWS
  );
  const emojiSize = Math.min(120, phoneWidth * 0.28, usableHeight * 0.13);

  const handlePress = (phoneKey: PhoneKey) => {
    play(phoneKey.sound);
    setActiveKey(phoneKey);
    setTapCount((count) => count + 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.bubble, styles.bubbleTop]} />
      <View style={[styles.bubble, styles.bubbleBottom]} />
      {/* Every press moves the antenna light on to its next blink pattern. */}
      <PhoneBody
        width={phoneWidth}
        isPlaying={isPlaying}
        lightPattern={tapCount}
      >
        <PhoneDisplay
          phoneKey={activeKey}
          tapCount={tapCount}
          isPlaying={isPlaying}
          emojiSize={emojiSize}
        />
        <PhoneKeypad
          keys={phoneKeys}
          keyHeight={keyHeight}
          gap={KEY_GAP}
          onPress={handlePress}
        />
      </PhoneBody>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: SCREEN_PADDING,
    paddingVertical: 8,
    overflow: "hidden",
  },
  bubble: {
    position: "absolute",
    borderRadius: 999,
    backgroundColor: Colors.backgroundDots,
  },
  bubbleTop: {
    width: 220,
    height: 220,
    top: -60,
    left: -80,
  },
  bubbleBottom: {
    width: 300,
    height: 300,
    bottom: -120,
    right: -110,
  },
});
