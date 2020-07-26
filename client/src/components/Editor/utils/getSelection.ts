

function getSelection(): Selection | undefined {
  const sel = window.getSelection && window.getSelection();
  if (!sel) {
    return;
  }
  return sel;
}

export {getSelection};