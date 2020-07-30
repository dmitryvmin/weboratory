export function log(content, ...args) {
  // type = "message"
  console.log(content, args);
  // args?.map((a) => console.log(a));
}