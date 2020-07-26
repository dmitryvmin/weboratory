function findStringLimit(searchChar, searchCharIndex, searchedString) {
  return searchedString.substring(0, searchedString.lastIndexOf(searchChar, searchCharIndex));
};

function highlightWords(wordsy, text) { /* eliminate a bug with parenthesis */
  wordsy = wordsy.replace("(", "");
  wordsy = wordsy.replace(")", ""); /* escape other characters for bug */
  text = text.replace(";", "");
  text = text.replace("'", "&#39;");
  text = text.replace("<", "&lt;");
  text = text.replace(">", "&gt;");
  text = text.replace("&lt;span", "<span");
  text = text.replace('autoCompleteWord"&gt;', 'autoCompleteWord">');
  text = text.replace("&lt;/span", "</span");
  text = text.replace('span&gt;', 'span>');

  var re = '(' + wordsy + ')(?![^<]*(?:<\/span class=\"autoCompleteWord\"|>))';
  var regExp = new RegExp(re, 'ig');
  var sTag = '<span className="autoCompleteWord">';
  var eTag = "</span>";

  return text.replace(regExp, sTag + '$&' + eTag);
};

function parseAndHighlight(wordstring: string, htmlString, className?: string) {
  var htmlStringUn = htmlString;

  var found = htmlStringUn.toLowerCase().indexOf(wordstring.toLowerCase(), 0);
  if (found >= 0) {
    htmlStringUn = highlightWords(wordstring, htmlStringUn);
  }
  else {
    //split and parse the beast
    var words = wordstring.split(/\W+/);

    var allPhrases: any = [];
    allPhrases.push(wordstring);
    var i = 0;
    i = words.length;
    while (i--) {
      allPhrases.push(findStringLimit(" ", allPhrases[(words.length - i) - 1].length, allPhrases[(words.length - i) - 1]));
    };

    i = allPhrases.length;
    while (i--) {
      if (allPhrases[i] != "") words = words.concat(allPhrases[i]);
    };
    i = words.length;
    while (i--) {
      htmlStringUn = highlightWords(words[i], htmlStringUn);
    };
  };
  return htmlStringUn;
}

export {parseAndHighlight};
