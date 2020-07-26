require("dotenv").config();

const task = process.env.npm_lifecycle_event.startsWith("pre")
  ? process.env.npm_lifecycle_event.slice(3)
  : process.env.npm_lifecycle_event;

const packageJSON = require("../package.json");

const availableEnvironments = Object.keys(packageJSON.scripts)
  .filter(key => key.startsWith(task))
  .map(key => key.split(":")[1])
  .filter(key => key);

if (!process.env.NODE_ENV) {
  console.log(
    `[ Error ] NODE_ENV is required. Use ${task}:${availableEnvironments.join(
      "/",
    )} scripts instead.`,
  );
  // process.exit(1);
  process.exit(0);
}

process.exit(0);
