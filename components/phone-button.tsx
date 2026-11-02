import type { PhoneKey } from "@/constants/phone-keys";
import { Colors, Fonts, shade } from "@/styles";
import * as Haptics from "expo-haptics";
import React from "react";
import { Platform, Pressable, StyleSheet, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type PhoneButtonProps = {
  phoneKey: PhoneKey;
  height: number;
  onPress: (phoneKey: PhoneKey) => void;
};

const KEY_DEPTH = 7;

function PhoneButton({ phoneKey, height, onPress }: PhoneButtonProps) {
  const pressed = useSharedValue(0);

  const faceStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: pressed.value * (KEY_DEPTH - 1) }],
  }));

  const handlePressIn = () => {
    pressed.value = withTiming(1, { duration: 50 });
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    // Play on touch-down so the sound feels instant, like a real toy button.
    onPress(phoneKey);
  };

  const handlePressOut = () => {
    pressed.value = withSpring(0, { damping: 12, stiffness: 400 });
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessibilityRole="button"
      accessibilityLabel={`${phoneKey.label}, ${phoneKey.title}`}
      style={[
        styles.edge,
        { height, backgroundColor: shade(phoneKey.color, 0.25) },
      ]}
    >
      <Animated.View
        style={[
          styles.face,
          { height: height - KEY_DEPTH, backgroundColor: phoneKey.color },
          faceStyle,
        ]}
      >
        <Text style={[styles.label, { fontSize: height * 0.42 }]}>
          {phoneKey.label}
        </Text>
        <Text style={{ fontSize: height * 0.3 }}>{phoneKey.emoji}</Text>
      </Animated.View>
    </Pressable>
  );
}

export { PhoneButton };

const styles = StyleSheet.create({
  edge: {
    flex: 1,
    borderRadius: 24,
  },
  face: {
    borderRadius: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    borderTopWidth: 3,
    borderTopColor: "rgba(255, 255, 255, 0.45)",
  },
  label: {
    fontFamily: Fonts.bold,
    color: Colors.white,
    textShadowColor: "rgba(0, 0, 0, 0.18)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 0,
  },
});
