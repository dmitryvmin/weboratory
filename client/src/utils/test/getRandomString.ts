function getRandomString(length: number = 15) {
  return [...Array(10)]
    .map(i => (~~(Math.random() * 36)).toString(36))
    .join("");
}

export {getRandomString};