/**
 * Compares zoom props to determine whether Map should rerender
 */
function hasMapZoomChanged(
  nextZoom: number,
  prevZoom?: number,
): boolean {
  if (prevZoom && prevZoom === nextZoom) {
    return false;
  }
  return true;
}

export { hasMapZoomChanged };
