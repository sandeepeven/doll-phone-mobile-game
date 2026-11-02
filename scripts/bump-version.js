#!/usr/bin/env node
/**
 * Bumps the app version before a build:
 *   - expo.version (Android versionName / iOS version) and package.json version
 *     get a semver bump (patch by default)
 *   - expo.android.versionCode goes up by 1
 *
 * Usage: node scripts/bump-version.js [patch|minor|major] [--dry-run]
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const APP_JSON = path.join(ROOT, "app.json");
const PACKAGE_JSON = path.join(ROOT, "package.json");
const LEVELS = ["patch", "minor", "major"];

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function writeJson(file, data) {
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
}

function nextVersion(version, level) {
  const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(version);
  if (!match) {
    throw new Error(`Version "${version}" is not in x.y.z form`);
  }
  let [major, minor, patch] = match.slice(1).map(Number);
  if (level === "major") {
    major += 1;
    minor = 0;
    patch = 0;
  } else if (level === "minor") {
    minor += 1;
    patch = 0;
  } else {
    patch += 1;
  }
  return `${major}.${minor}.${patch}`;
}

/** Bumps app.json and package.json. Returns the old/new values and a restore() helper. */
function bumpVersion({ level = "patch", dryRun = false } = {}) {
  if (!LEVELS.includes(level)) {
    throw new Error(`Unknown bump level "${level}" (use ${LEVELS.join(", ")})`);
  }

  const originalApp = fs.readFileSync(APP_JSON, "utf8");
  const originalPackage = fs.readFileSync(PACKAGE_JSON, "utf8");
  const app = readJson(APP_JSON);
  const pkg = readJson(PACKAGE_JSON);

  const oldVersion = app.expo.version;
  const oldVersionCode = app.expo.android?.versionCode ?? 0;
  const version = nextVersion(oldVersion, level);
  const versionCode = oldVersionCode + 1;

  if (!dryRun) {
    app.expo.version = version;
    app.expo.android = { ...app.expo.android, versionCode };
    pkg.version = version;
    writeJson(APP_JSON, app);
    writeJson(PACKAGE_JSON, pkg);
  }

  return {
    oldVersion,
    oldVersionCode,
    version,
    versionCode,
    restore() {
      fs.writeFileSync(APP_JSON, originalApp);
      fs.writeFileSync(PACKAGE_JSON, originalPackage);
    },
  };
}

module.exports = { bumpVersion, LEVELS };

if (require.main === module) {
  const args = process.argv.slice(2);
  const level = args.find((arg) => !arg.startsWith("--")) ?? "patch";
  const dryRun = args.includes("--dry-run");
  try {
    const result = bumpVersion({ level, dryRun });
    console.log(
      `${dryRun ? "[dry run] " : ""}version ${result.oldVersion} -> ${result.version}, ` +
        `versionCode ${result.oldVersionCode} -> ${result.versionCode}`
    );
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
