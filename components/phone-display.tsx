import type { PhoneKey } from "@/constants/phone-keys";
import { Colors, Fonts } from "@/styles";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type PhoneDisplayProps = {
  phoneKey: PhoneKey | null;
  tapCount: number;
  isPlaying: boolean;
  emojiSize: number;
};

function PhoneDisplay({
  phoneKey,
  tapCount,
  isPlaying,
  emojiSize,
}: PhoneDisplayProps) {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  React.useEffect(() => {
    if (tapCount === 0) return;
    scale.value = withSequence(
      withTiming(0.6, { duration: 60 }),
      withSpring(1, { damping: 6, stiffness: 220 })
    );
    rotation.value = withSequence(
      withTiming(-12, { duration: 70 }),
      withTiming(12, { duration: 110 }),
      withSpring(0, { damping: 5 })
    );
  }, [tapCount, scale, rotation]);

  const emojiStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotation.value}deg` }],
  }));

  return (
    <View style={styles.bezel}>
      <View style={styles.screen}>
        <View style={styles.glow} />
        <Animated.Text
          style={[styles.emoji, { fontSize: emojiSize }, emojiStyle]}
          accessibilityElementsHidden
          importantForAccessibility="no"
        >
          {phoneKey?.emoji ?? "👋"}
        </Animated.Text>
        <Text
          style={styles.title}
          numberOfLines={1}
          adjustsFontSizeToFit
          accessibilityLiveRegion="polite"
        >
          {phoneKey?.title ?? "Hello!"}
        </Text>
        <Text style={styles.status}>
          {phoneKey
            ? isPlaying
              ? "♪ ♫ ♪ playing ♪ ♫ ♪"
              : "Press it again!"
            : "Press a button!"}
        </Text>
      </View>
    </View>
  );
}

export { PhoneDisplay };

const styles = StyleSheet.create({
  bezel: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: Colors.bezel,
    padding: 8,
    marginBottom: 18,
  },
  screen: {
    flex: 1,
    borderRadius: 24,
    backgroundColor: Colors.screen,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    overflow: "hidden",
  },
  glow: {
    position: "absolute",
    top: -60,
    left: -40,
    width: 200,
    height: 160,
    borderRadius: 100,
    backgroundColor: Colors.screenGlow,
    transform: [{ rotate: "-20deg" }],
  },
  emoji: {
    textAlign: "center",
  },
  title: {
    marginTop: 8,
    fontFamily: Fonts.bold,
    fontSize: 34,
    color: Colors.ink,
  },
  status: {
    marginTop: 4,
    fontFamily: Fonts.medium,
    fontSize: 16,
    color: Colors.inkSoft,
  },
});
