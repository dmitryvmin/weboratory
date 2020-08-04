/**
 * First argument is treated as an optional log configuration object
 */
const log = (config, ...args): void => {

  // const LOG_LEVEL = // Verbose, Info, Warning, or Error
  const LOG_STYLES = "color: green; font-size: 14px";
  const LOG_PREFIX = "==========";

  let LOG_GROUP_NAME = `${LOG_PREFIX} ${Date.now()}`;
  let notifyAs = "log";
  let configVal = false;

  if (typeof config === "object") {
    if (Object.keys(config).includes("notifyAs")) {
      notifyAs = config.notifyAs;
    }
    if (Object.keys(config).includes("labelAs")) {
      LOG_GROUP_NAME = `${LOG_PREFIX} ${config.labelAs} ${Date.now()}`;
    }
    if (Object.keys(config).includes("status")) {
      configVal = true;
      notifyAs = "warn";
    }
    if (Object.keys(config).includes("error")) {
      configVal = true;
      notifyAs = "warn";
    }
  }

  console.group(LOG_GROUP_NAME);

  if (configVal) {
    console[notifyAs](config);
  }

  [...args].map((a) => {
    if (
      typeof a !== "object"
    ) {
      console.log(`%c${a}`, LOG_STYLES);
    }
    else {
      console.dir(a);
    }
  });

  console.groupEnd();
};

export { log };
