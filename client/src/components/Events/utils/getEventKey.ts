function getNewEventKey(address = Date.now().toString()) {
  return `new-event-${address}`;
}

function getEventKey(address: string) {
  return `new-event-${address}`;
}

export {
  getNewEventKey,
  getEventKey,
};
