#!/usr/bin/env node

import draw from "./index.mjs";

const args = process.argv[2];
if (args === undefined || args === "--help" || args === "-h") {
  console.log("Usage: termage [image-path]");
} else {
  draw(args)
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
