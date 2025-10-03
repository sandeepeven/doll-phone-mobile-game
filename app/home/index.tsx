import {
  DisplayCover,
  PhoneBody,
  PhoneButton,
  PhoneButtonContainer,
  PhoneDisplay,
  TitleText,
} from "@/components";
import NumericPad from "@/constants/numeric-pad.json";
import { useAudioManager } from "@/lib/audio-player";
import React from "react";
import { AppState, BackHandler } from "react-native";
import { audioTracks } from "../../constants/audio-tracks";

export default function HomeScreen() {
  const [track, setTrack] = React.useState(audioTracks[0]);
  const appState = React.useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = React.useState(
    appState.current
  );
  const {
    player,
    playTrack,
    pauseTrack,
    stopTrack,
    replayTrack,
    currentTrack,
    playerStatus,
  } = useAudioManager(track);

  React.useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", function () {
      if (playerStatus) {
        stopTrack();
      }
      BackHandler.exitApp();
      return true;
    });
  });

  React.useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App has come to the foreground!");
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      if (appState.current === "background") {
        pauseTrack();
      }
    });

    return () => {
      subscription.remove();
    };
  }, [pauseTrack]);

  const onPlay = (id: number) => {
    if (track.title !== audioTracks[id].title) {
      setTrack(audioTracks[id]);
      return;
    }
    replayTrack();
  };

  return (
    <>
      <PhoneBody>
        <PhoneDisplay>
          <DisplayCover src={track.artwork} />
          <TitleText content={track.title} />
        </PhoneDisplay>
        {NumericPad.map((btnGroup, it) => (
          <PhoneButtonContainer key={it}>
            {btnGroup.map((btn) => (
              <PhoneButton
                key={btn.name}
                signContent={btn.sign}
                content={btn.label}
                onPressPlay={() => onPlay(btn.sound)}
              />
            ))}
          </PhoneButtonContainer>
        ))}
      </PhoneBody>
    </>
  );
}
