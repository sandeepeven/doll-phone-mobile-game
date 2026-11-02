import type { AudioSource } from "expo-audio";

import alienShoot from "@/assets/sounds/alien_shoot.wav";
import backgroundMusic from "@/assets/sounds/background_music.mp3";
import bonus from "@/assets/sounds/bonus.wav";
import crush8Bit from "@/assets/sounds/crush_8_bit.mp3";
import dogBarking from "@/assets/sounds/dog_barking.mp3";
import eagle from "@/assets/sounds/eagle.mp3";
import evilLaugh from "@/assets/sounds/evil_laugh.mp3";
import gotItem from "@/assets/sounds/got_item.mp3";
import oddBounce from "@/assets/sounds/odd_bounce.mp3";
import race from "@/assets/sounds/race.mp3";
import start from "@/assets/sounds/start.mp3";
import winner from "@/assets/sounds/winner.mp3";

export type PhoneKey = {
  label: string;
  title: string;
  emoji: string;
  color: string;
  sound: AudioSource;
};

// Laid out row by row like a real phone keypad: 1-2-3, 4-5-6, 7-8-9, *-0-#.
export const phoneKeys: PhoneKey[] = [
  { label: "1", title: "Alien Zap", emoji: "👽", color: "#FF6B6B", sound: alienShoot },
  { label: "2", title: "Bonus", emoji: "🎁", color: "#FFA94D", sound: bonus },
  { label: "3", title: "Music", emoji: "🎵", color: "#FCC419", sound: backgroundMusic },
  { label: "4", title: "Boing", emoji: "🏀", color: "#51CF66", sound: oddBounce },
  { label: "5", title: "Spooky Laugh", emoji: "👻", color: "#20C997", sound: evilLaugh },
  { label: "6", title: "Woof Woof", emoji: "🐶", color: "#339AF0", sound: dogBarking },
  { label: "7", title: "Eagle", emoji: "🦅", color: "#5C7CFA", sound: eagle },
  { label: "8", title: "Crash", emoji: "💥", color: "#9775FA", sound: crush8Bit },
  { label: "9", title: "Got It!", emoji: "⭐", color: "#F06595", sound: gotItem },
  { label: "*", title: "Race", emoji: "🏎️", color: "#FF8787", sound: race },
  { label: "0", title: "Winner", emoji: "🏆", color: "#38D9A9", sound: winner },
  { label: "#", title: "Blast Off", emoji: "🚀", color: "#4DABF7", sound: start },
];

export const KEYS_PER_ROW = 3;
