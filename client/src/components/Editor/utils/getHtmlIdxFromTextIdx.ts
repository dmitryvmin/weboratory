// https://stackoverflow.com/questions/54867982/finding-innertext-index-in-innerhtml
function getIndicesOf(searchStr, str, caseSensitive) {
  let searchStrLen = searchStr.length;
  if (searchStrLen == 0) {
    return [];
  }
  let startIndex = 0;
  let index;
  let indices: any[] = [];
  if (!caseSensitive) {
    str = str.toLowerCase();
    searchStr = searchStr.toLowerCase();
  }
  while ((index = str.indexOf(searchStr, startIndex)) > -1) {
    indices.push(index);
    startIndex = index + searchStrLen;
  }
  return indices;
}

function getHtmlIdxFromTextIdx(startIndex: number, endIndex: number, innerText, innerHTML) {
  let stringToSearch = innerText.substring(startIndex, endIndex);
  let occurInInnerText: any = getIndicesOf(stringToSearch, innerText, true);
  let whichOccurence = occurInInnerText.indexOf(startIndex);
  let stringToSearchInHTML = stringToSearch
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/\n/g, "<br>");
  let occurencesInHTML: any [] = [];
  let isChecking = true;

  for (let i = 0; i < innerHTML.length; i++) {
    if (stringToSearchInHTML == stringToSearch) {
      if (innerHTML.charAt(i) == "<" || innerHTML.charAt(i) == "&") {
        isChecking = false;
      }
      else if (innerHTML.charAt(i - 1) == ">" || innerHTML.charAt(i - 1) == ";") {
        isChecking = true;
      }

    }
    else {
      if (innerHTML.charAt(i) == "<") {
        isChecking = false;
      }
      else if (innerHTML.charAt(i - 1) == ">") {
        isChecking = true;
      }
    }
    if (isChecking) {
      if (innerHTML.substring(i, i + stringToSearchInHTML.length) == stringToSearchInHTML) {
        occurencesInHTML.push(i);
      }
    }
  }

  let startIndexInHTML = occurencesInHTML[whichOccurence];
  let endIndexInHTML = startIndexInHTML + stringToSearchInHTML.length;

  return [startIndexInHTML, endIndexInHTML];
}

export { getHtmlIdxFromTextIdx };
