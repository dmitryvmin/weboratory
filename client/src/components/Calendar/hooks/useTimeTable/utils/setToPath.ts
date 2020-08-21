function setToPath(
  obj: {},
  pathArray: (string | number)[],
  valueToSet: any,
) {

  let res = obj;

  for (let i = 0; i < pathArray.length - 1; i++) {
    res = res[pathArray[i]];
  }

  const finalKey = pathArray[pathArray.length - 1];
  res[finalKey] = valueToSet;
}

export { setToPath };
