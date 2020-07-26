function getPosition(
  editor: HTMLElement,
  traverseNode: (el: Node) => "stop" | undefined,
) {
  const queue: Node[] = [];

  if (editor.firstChild) {
    queue.push(editor.firstChild);
  }

  let el = queue.pop();

  while (el) {

    if (traverseNode(el) === "stop") {
      break;
    }

    if (el.nextSibling) {
      queue.push(el.nextSibling);
    }
    if (el.firstChild) {
      queue.push(el.firstChild);
    }

    el = queue.pop();
  }
}

export {getPosition};
