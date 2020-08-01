function getPositionFromTarget(target: HTMLDivElement | undefined | null): DOMRect | undefined {
  if (!target) {
    return undefined;
  }
  return target.getBoundingClientRect();
}

export { getPositionFromTarget };
