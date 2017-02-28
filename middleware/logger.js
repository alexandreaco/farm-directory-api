const debug = require('debug')('logger');

// Logs requests to server
const logger = (req, res, next) => {
  const date = new Date();
  debug(`${date.toUTCString()} ${req.method} ${req.url}`);
  next();
};
export default logger;
