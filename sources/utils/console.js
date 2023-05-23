import { logger, consoleTransport } from "react-native-logs";

const defaultConfig = {
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  },
  severity: "debug",
  transport: consoleTransport,
  transportOptions: {
    colors: {
      info: "blueBright",
      warn: "yellowBright",
      error: "redBright",
    },
  },
  async: true,
  dateFormat: "time",
  printLevel: true,
  printDate: true,
  enabled: true,
};

var log = logger.createLogger(defaultConfig);

const logDebug = (...params) => {
    log.debug(...params);
  }
  const logWarm = (...params) => {
    log.warn(...params);
  }
  const logInfo = (...params) => {
    log.info(...params);
  }
  const logError = (...params) => {
    log.error(...params);
  }
  export {
    logDebug,
    logWarm,
    logInfo,
    logError
  }