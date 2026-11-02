#!/usr/bin/env node
/**
 * Bumps the version (see bump-version.js), then runs an EAS Android build.
 * If the build fails, the version bump is rolled back.
 *
 * Usage: node scripts/build-android.js [aab|apk] [patch|minor|major] [--local]
 *   aab    Play Store bundle (profile android-aab-store), the default
 *   apk    installable test APK (profile android-apk-local)
 *   --local  build on this machine; the file is written to dist/
 */
const { spawnSync } = require("child_process");
const path = require("path");
const { bumpVersion, LEVELS } = require("./bump-version");

const PROFILES = {
  aab: "android-aab-store",
  apk: "android-apk-local",
};

const args = process.argv.slice(2);
const type = args.find((arg) => arg in PROFILES) ?? "aab";
const level = args.find((arg) => LEVELS.includes(arg)) ?? "patch";
const local = args.includes("--local");

const bump = bumpVersion({ level });
console.log(
  `Building ${type.toUpperCase()} ${bump.version} (versionCode ${bump.versionCode})` +
    `, was ${bump.oldVersion} (${bump.oldVersionCode})`
);

const easArgs = [
  "--yes",
  "eas-cli@latest",
  "build",
  "--platform",
  "android",
  "--profile",
  PROFILES[type],
];
if (local) {
  const output = path.join(
    "dist",
    `doll-phone-${bump.version}-vc${bump.versionCode}.${type}`
  );
  easArgs.push("--local", "--output", output);
}

const result = spawnSync("npx", easArgs, {
  cwd: path.join(__dirname, ".."),
  stdio: "inherit",
});

if (result.status !== 0) {
  bump.restore();
  console.error(
    `\nBuild failed, so the version was put back to ${bump.oldVersion} ` +
      `(versionCode ${bump.oldVersionCode}).`
  );
  process.exit(result.status ?? 1);
}

console.log(
  `\nBuilt ${bump.version} (versionCode ${bump.versionCode}). ` +
    "Commit app.json and package.json to keep the new version."
);
