// Filters out falsy args to create a string of classNames
function getClassName(...args): string | undefined {
  const classNames: string[] = [];

  for (let i = 0; i < args.length; i++) {
    const className = args[i];
    if (className && typeof className === "string") {
      classNames.push(className);
    }
  }

  return (classNames.length)
    ? classNames.join(" ")
    : undefined;
}

export {getClassName as cn};
