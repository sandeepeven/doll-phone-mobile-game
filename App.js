/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useRef, useState, Modal } from 'react';
import { BackHandler, AppState } from 'react-native';
import { PhoneBodyStyle, PhoneButtonStyle, PhoneBodyOutlineStyle, PhoneButtonTextStyle, TitleTextStyle, PhoneButtonContainerStyle, SignContentStyle, PhoneDisplayStyle, CoverStyle } from './styles';
import { PhoneButton, PhoneBody, PhoneButtonContainer, PhoneDisplay, DisplayCover, TitleText } from './components';
import NumericData from './numeric-pad.json';
import { playAudio, stopAudio, pauseAudio } from './Player';
import Tracks from './Player/tracks.json';
import BootSplash from "react-native-bootsplash";
import { storeData, getData } from './AsyncStorage';
import { ExampleModal } from './Modal';

const defaultTrack = {
  artwork: "https://img.freepik.com/free-vector/music-band-kids-cartoon_1308-126797.jpg?w=200",
  title: "No Track"
}


const App = () => {
  const [selectedTrack, setSelectedTrack] = React.useState(defaultTrack);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [agreement, askAgreement] = useState(false);

  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
      const local = await getData();
      if (local === 'yes') {
        askAgreement(false);
      } else {
        askAgreement(true);
      }
    };

    BackHandler.addEventListener('hardwareBackPress', function () {
      stopAudio();
      return false;
    });

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
      console.log("BootSplash has been hidden successfully");
    });
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      if (appState.current === 'background') {
        pauseAudio();
      }
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const onPlay = (id) => {
    setSelectedTrack(Tracks[id]);
    playAudio(id);
  }

  const updateAgreement = async () => {
    await storeData('yes');
    askAgreement(false);
  }

  return (
    <React.Fragment>
      <PhoneBody bodyStyle={PhoneBodyStyle} bodyOutlineStyle={PhoneBodyOutlineStyle}>
        <PhoneDisplay bodyStyle={PhoneDisplayStyle}>
          <DisplayCover src={selectedTrack.artwork} coverStyle={CoverStyle} />
          <TitleText content={selectedTrack.title} textStyle={TitleTextStyle} />
        </PhoneDisplay>
        {NumericData.map((btnGroup, it) =>
          <PhoneButtonContainer
            key={it}
            phoneButtonContainerStyle={PhoneButtonContainerStyle}>
            {btnGroup.map(btn =>
              <PhoneButton
                key={btn.name}
                signContent={btn.sign}
                signContentStyle={SignContentStyle}
                bodyStyle={PhoneButtonStyle}
                content={btn.label}
                onPressPlay={() => onPlay(btn.sound)}
                textStyle={PhoneButtonTextStyle} />)}
          </PhoneButtonContainer>)}
      </PhoneBody>
      <ExampleModal visible={agreement} updateAgreement={updateAgreement} />
    </React.Fragment>
  );
};

export default App;
