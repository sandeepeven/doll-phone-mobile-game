import {
  setAudioModeAsync,
  useAudioPlayer,
  useAudioPlayerStatus,
  type AudioSource,
} from "expo-audio";
import { useEffect, useRef } from "react";
import { AppState } from "react-native";

// Note: expo-audio's `preload()` is intentionally not used. On iOS (expo-audio
// 58.0.11) replacing a player's source with a preloaded one freezes the JS thread.

/**
 * A single shared player for the keypad: each tap swaps in the new sound
 * (or restarts the current one), and playback pauses when the app is backgrounded.
 */
export function useSoundBoard() {
  const player = useAudioPlayer(null);
  const status = useAudioPlayerStatus(player);
  const currentSource = useRef<AudioSource | null>(null);

  useEffect(() => {
    // Kids' toy: play even when the ringer switch is on silent.
    setAudioModeAsync({
      playsInSilentMode: true,
      interruptionMode: "doNotMix",
    }).catch(() => {});
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      if (state !== "active") {
        player.pause();
      }
    });
    return () => subscription.remove();
  }, [player]);

  const play = (source: AudioSource) => {
    if (currentSource.current !== source) {
      currentSource.current = source;
      player.replace(source);
    } else {
      player.seekTo(0);
    }
    player.play();
  };

  return { play, isPlaying: status.playing };
}
