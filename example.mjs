import draw from "./index.mjs";

await draw("example.png")
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Error drawing image:", err);
    process.exit(1);
  });
