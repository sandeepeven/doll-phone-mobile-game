# Doll Phone

A toy phone for little kids: every key on the keypad plays a fun sound and shows a
matching picture on the phone screen. Built with [Expo](https://expo.dev) (SDK 58) and
Expo Router.

## Requirements

- Node.js 22.13+ (`nvm use` picks it up from `.nvmrc`)

## Getting started

```bash
npm install
npm start          # then press i (iOS) or a (Android)
```

## Scripts

| Command             | What it does                    |
| ------------------- | ------------------------------- |
| `npm start`         | Start the Expo dev server       |
| `npm run ios`       | Start and open the iOS app      |
| `npm run android`   | Start and open the Android app  |
| `npm run lint`      | Lint with ESLint                |
| `npm run typecheck` | Type-check with TypeScript      |

## Project layout

- `app/`: screens (`index` decides between the parent agreement and the phone)
- `components/`: phone body, screen, keypad and keys
- `constants/phone-keys.ts`: the 12 keys (label, title, emoji, color, sound)
- `lib/audio-player/`: the single shared sound player
- `assets/sounds/`: bundled sound effects

To change what a key does, edit its entry in `constants/phone-keys.ts`.

## Builds

EAS build profiles live in `eas.json` (`android-apk-local`, `android-aab-store`).
