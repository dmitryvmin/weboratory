function getPositionFromTarget(target: HTMLDivElement | undefined | null) {
  if (!target) {
    return undefined;
  }
  return target.getBoundingClientRect();
}

export { getPositionFromTarget };
