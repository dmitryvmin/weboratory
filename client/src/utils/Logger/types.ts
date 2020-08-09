export type LogLevel =
  | "debug"
  | "error"
  | "info"
  | "log"
  | "trace"
  | "warn"
  ;

export type LogArgs = {
  loggerConfig: {
    logLevel: LogLevel;
    logLabel: string;
  };
} & any;