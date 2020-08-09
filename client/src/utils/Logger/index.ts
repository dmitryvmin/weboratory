import { LogArgs, LogLevel } from "@utils/Logger/types";

/**
 * First argument is treated as an optional log configuration object
 */
const log = (config: LogArgs, ...args): void => {

  if (process.env.REACT_APP_LOGGER_STATUS === "OFF") {
    return;
  }

  // const LOG_LEVEL = // Verbose, Info, Warning, or Error
  const LOG_STYLES = "color: green; font-size: 14px";
  const LOG_PREFIX = "==========";

  // Group the log call and mark it with a timestamp
  let logGroupLabel = `${LOG_PREFIX} ${Date.now()}`;
  let logLevel = process.env.REACT_APP_LOGGER_LOG_LEVEL;
  let logConfig = false;

  // Check if the first argument could be a logger config...
  if (typeof config === "object") {

    // If the argument is an object and contains a logLevel key, assume it is
    if (Object.keys(config).includes("logLevel")) {

      // Get the logLevel value
      const { logLevel: logLevelArg } = config;

      // Check that the value is valid
      if (
        logLevelArg !== "debug"
        && logLevelArg !== "error"
        && logLevelArg !== "info"
        && logLevelArg !== "log"
        && logLevelArg !== "trace"
        && logLevelArg !== "warn"
      ) {
        log(
          {
            logLevel: "warn",
          },
          "Logger logLevel value is invalid",
          logLevelArg,
          "logLevel should be set to 'debug', 'error', 'info', 'log', 'trace', or 'warn'",
        );
        return;
      }

      logLevel = logLevelArg;
      logConfig = true;
    }

    // Check of object contains a logLabel property
    if (Object.keys(config).includes("logLabel")) {

      const { logLabel: logLabelArg } = config;
      if (!logLabelArg) {
        return;
      }
      // logGroupName = `${LOG_PREFIX} ${config.logLabel} ${Date.now()}`;
      logGroupLabel = logLabelArg;
      logConfig = true
    }
  }

  let logs: any[] = [];
  // If first argument wasn't a config object, add it to the args array
  if (logConfig) {
    logs = args;
  }
  else {
    logs = [config, ...args];
  }

  // Print logs
  [logs].map((a) => {
    if (
      typeof a !== "object"
    ) {
      console[logLevel ?? "log"](`%c${a}`, LOG_STYLES);
    }
    else {
      console.dir(a);
    }
  });

  console.groupEnd();
};

export { log };
