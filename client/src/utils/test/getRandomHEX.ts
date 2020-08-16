/**
 * Return a random color value from the [rangeStart] - [rangeEnd] range
 */
function getRandomColorValue(
  rangeStart = 0,
  rangeEnd = 255,
): number {
  return Math.floor(Math.random() * rangeEnd + rangeStart);
}

/**
 * Returns a random HEX color code
 */
function getRandomHEX(): string {

  // HEX color code is consists of red, green, and blue color values
  const colorArray = ["R", "G", "B"];

  // Create a color value for each color
  return `#${
    // Get random color value
    colorArray.map(() => getRandomColorValue()
      // Convert value to a hexadecimal number
      .toString(16)
      // In case the return value is a single digit, pad it with 0
      .padStart(2, "0")
      // Format the string
      .toUpperCase())
      // Join the RGB hex color values
      .join("")
  }`;
}

export {
  getRandomHEX,
};
