import { Colors } from "@/styles";
import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  cancelAnimation,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

type AntennaLightProps = {
  isPlaying: boolean;
  /** Picks the blink pattern used while playing; any integer works. */
  patternIndex: number;
};

const snap = (value: number, duration: number) =>
  withTiming(value, { duration, easing: Easing.linear });

// Each pattern animates the light's "lit" level between 0 (off) and 1 (on).
const BLINK_PATTERNS = [
  // Steady on/off.
  () =>
    withRepeat(
      withSequence(snap(1, 60), snap(1, 340), snap(0, 60), snap(0, 340)),
      -1
    ),
  // Two quick flashes and a pause, like a phone ringing.
  () =>
    withRepeat(
      withSequence(
        snap(1, 40),
        snap(1, 110),
        snap(0, 40),
        snap(0, 110),
        snap(1, 40),
        snap(1, 110),
        snap(0, 40),
        snap(0, 600)
      ),
      -1
    ),
  // A soft, quick pulse.
  () =>
    withRepeat(
      withTiming(1, { duration: 450, easing: Easing.inOut(Easing.sin) }),
      -1,
      true
    ),
];

const LIGHT_SIZE = 24;

function AntennaLight({ isPlaying, patternIndex }: AntennaLightProps) {
  const lit = useSharedValue(1);
  const playing = useSharedValue(0);
  const startPattern = BLINK_PATTERNS[patternIndex % BLINK_PATTERNS.length];

  React.useEffect(() => {
    playing.value = isPlaying ? 1 : 0;
    cancelAnimation(lit);
    if (isPlaying) {
      lit.value = 0;
      lit.value = startPattern();
    } else {
      // Idle: settle into a steady yellow glow.
      lit.value = withTiming(1, { duration: 200 });
    }
    return () => cancelAnimation(lit);
  }, [isPlaying, startPattern, lit, playing]);

  const lightStyle = useAnimatedStyle(() => ({
    backgroundColor:
      playing.value === 1
        ? interpolateColor(
            lit.value,
            [0, 1],
            [Colors.lightPlayingOff, Colors.lightPlaying]
          )
        : Colors.lightIdle,
  }));

  const haloStyle = useAnimatedStyle(() => ({
    backgroundColor:
      playing.value === 1 ? Colors.lightPlaying : Colors.lightIdle,
    opacity: playing.value === 1 ? lit.value * 0.6 : 0.3,
    transform: [{ scale: playing.value === 1 ? 1 + lit.value * 0.8 : 1.35 }],
  }));

  return (
    <View
      style={styles.container}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <Animated.View style={[styles.halo, haloStyle]} />
      <Animated.View style={[styles.light, lightStyle]} />
    </View>
  );
}

export { AntennaLight };

const styles = StyleSheet.create({
  container: {
    marginTop: -12,
    width: LIGHT_SIZE,
    height: LIGHT_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  halo: {
    position: "absolute",
    width: LIGHT_SIZE,
    height: LIGHT_SIZE,
    borderRadius: LIGHT_SIZE / 2,
  },
  light: {
    width: LIGHT_SIZE,
    height: LIGHT_SIZE,
    borderRadius: LIGHT_SIZE / 2,
    borderWidth: 4,
    borderColor: Colors.shellEdge,
  },
});
