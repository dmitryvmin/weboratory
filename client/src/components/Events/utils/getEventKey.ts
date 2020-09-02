function getNewEventKey(address = Date.now().toString()) {
  return `new-event-${address}`;
}

export {
  getNewEventKey,
};
