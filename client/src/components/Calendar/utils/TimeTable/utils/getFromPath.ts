function getFromPath(obj, pathArray) {
  let res = obj;
  for (let i = 0; i < pathArray.length; i++) {
    res = res[pathArray[i]];
  }
  return res;
}

export {getFromPath};
