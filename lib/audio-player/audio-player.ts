import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { useEffect } from "react";

export type TrackT = {
  artwork: string;
  title: string;
  file: any;
};

export function useAudioManager(track: TrackT) {
  const player = useAudioPlayer(track.file);
  const status = useAudioPlayerStatus(player);

  // Effect to handle track changes
  useEffect(() => {
    // When track changes, the useAudioPlayer will automatically
    // create a new player instance with the new source
    playTrack();
  }, [track.file]);

  const playTrack = () => {
    player.play();
  };

  const pauseTrack = () => {
    player.pause();
  };

  const stopTrack = () => {
    player.pause();
    player.seekTo(0);
  };

  const replayTrack = () => {
    player.seekTo(0);
    player.play();
  };

  return {
    player,
    playTrack,
    pauseTrack,
    stopTrack,
    replayTrack,
    currentTrack: track,
    playerStatus: status,
  };
}
