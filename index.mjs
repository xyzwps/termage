import { black } from "ansis";
import { Jimp, intToRGBA } from "jimp";

/**
 * @param {number} width
 * @param {number} height
 */
function determineSize(width, height) {
  const maxWidth = process.stdout.columns;
  const maxHeight = process.stdout.rows * 2;

  if (maxHeight >= height && maxWidth >= width) {
    return { width, height };
  }

  if ((maxHeight * 1.0) / maxWidth >= (height * 1.0) / width) {
    const newWidth = maxWidth;
    const newHeight = Math.floor(height * (maxWidth / width));
    return { width: newWidth, height: newHeight };
  }

  const newHeight = maxHeight;
  const newWidth = Math.floor(width * (maxHeight / height));
  return { width: newWidth, height: newHeight };
}

export default async function draw(path) {
  const image = await Jimp.read(path);
  const newSize = determineSize(image.width, image.height);
  await image.resize({ w: newSize.width, h: newSize.height }); // resize

  for (let i = 0; i < newSize.height; i += 2) {
    const j = i + 1;
    // TODO: support transparent
    // TODO: support cli
    if (j >= newSize.height) {
      // one row
      let row = "";
      for (let x = 0; x < newSize.width; x++) {
        const c = intToRGBA(image.getPixelColor(x, i));
        row += black.rgb(c.r, c.g, c.b)("▀");
      }
      console.log(row);
    } else {
      // two rows
      let row = "";
      for (let x = 0; x < newSize.width; x++) {
        const c1 = intToRGBA(image.getPixelColor(x, i));
        const c2 = intToRGBA(image.getPixelColor(x, j));
        row += black.bgRgb(c2.r, c2.g, c2.b)(black.rgb(c1.r, c1.g, c1.b)("▀"));
      }
      console.log(row);
    }
  }
}
