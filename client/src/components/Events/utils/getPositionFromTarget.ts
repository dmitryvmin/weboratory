/**
 * Get a node's DOMRect object
 */
function getPositionFromTarget(
  target: HTMLDivElement | undefined | null,
): DOMRect | undefined {
  if (!target) {
    return;
  }
  return target.getBoundingClientRect();
}

export { getPositionFromTarget };
