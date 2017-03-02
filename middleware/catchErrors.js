const debug = require('debug')('error');

// Nicely formats error responses.
const catchErrors = (err, req, res, next) => {
  const date = new Date();
  debug(`${err.status}: ${err.message} \n ${date.toUTCString()} ${req.method} ${req.url}`);
  res.status(err.status || 404);
  res.send({
    error: {
      status: err.status || 404,
      message: err.message,
    },
  });
  next();
};
export default catchErrors;
