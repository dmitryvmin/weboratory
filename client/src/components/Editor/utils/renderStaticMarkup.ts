import { HistoryRecord } from "@components/Editor/types";
import ReactDOMServer from "react-dom/server";
import HtmlToReactParser from "html-to-react";

function renderStaticMarkup(record: HistoryRecord) {
  const htmlToReactParser = new HtmlToReactParser.Parser();
  const reactElements = htmlToReactParser.parse(record.html);
  const staticMarkup = ReactDOMServer.renderToStaticMarkup(reactElements);
  return staticMarkup;
}

export {renderStaticMarkup};
