#!/usr/bin/env node
/**
 * Patch-bump package.json version and sync assets/version.js.
 * Skip bump: LOT_SKIP_VERSION_BUMP=1
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const pkgPath = path.join(root, "package.json");
const versionPath = path.join(root, "assets", "version.js");

const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
let version = pkg.version || "0.1.0";

if (process.env.LOT_SKIP_VERSION_BUMP !== "1") {
  const parts = version.split(".").map(Number);
  if (parts.length === 3 && parts.every((n) => !Number.isNaN(n))) {
    parts[2] += 1;
    version = parts.join(".");
    pkg.version = version;
    writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n", "utf8");
    console.log(`Bumped package.json → v${version}`);
  }
} else {
  console.log(`LOT_SKIP_VERSION_BUMP=1 — synced version.js from package.json → v${version}`);
}

const versionJs = `window.LOT_GATE_VERSION = "${version}";\n`;
writeFileSync(versionPath, versionJs, "utf8");
console.log(`Wrote assets/version.js → v${version}`);
