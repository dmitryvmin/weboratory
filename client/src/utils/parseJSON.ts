const parseJSON = (
  stringToParse: string | undefined,
  removeBackSlash = false,
): {} | undefined => {

  if (!stringToParse) {
    return;
  }

  try {
    const data = JSON.parse(
      removeBackSlash
        ? stringToParse.replace(/\\"/g, '"') // needs to be the double quote char
        : stringToParse,
    );

    return data;
  }
  catch (error) {
    console.warn("Couldn't parse string:", stringToParse, error);
    return;
  }
}

export { parseJSON };