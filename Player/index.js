import Tracks from './tracks.json';
var Sound = require('react-native-sound');

var globalSound = null;

export const playAudio = (soundIndex) => {
    stopAudio();
    const soundFile = Tracks[soundIndex].file;
    try {
        // or play from url
        var whoosh = new Sound(soundFile, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            }
            // loaded successfully
            console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());

            // Play the sound with an onEnd callback
            whoosh.play((success) => {
                if (success) {
                    console.log('successfully finished playing');
                } else {
                    console.log('playback failed due to audio decoding errors');
                }
            });
            globalSound = whoosh;
        });
    } catch (e) {
        console.log(`cannot play the sound file`, e)
    }
}

export const pauseAudio = () => {
    if (globalSound) {
        globalSound.pause();
    }
}

export const stopAudio = () => {
    if (globalSound) {
        globalSound.stop(() => {
            // Note: If you want to play a sound after stopping and rewinding it,
            // it is important to call play() in a callback.
            // whoosh.play();
        });
    }
}