import { match as Imatch } from "react-router-dom";

function checkIfSelected(
  title?: string,
  match?: Imatch<{ id: string }> | null,
) {
  if (!match?.params?.id) {
    return;
  };
  if (match.params.id === "new" && title === undefined) {
    return true;
  }
  else {
    return match.params.id === title;
  }
}

export {checkIfSelected};
