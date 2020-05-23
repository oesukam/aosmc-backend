import 'dotenv/config';

import logger from 'helpers/logger';

const errorHandler = (err, req, res) => {
  const status = err.status || 500;

  logger.error(err.stack);

  const data = {
    status,
    message: err.message,
  };

  if (process.env.NODE_ENV !== 'production') {
    data.error = err;
  }

  res.status(status);

  return res.json({ ...data });
};

export default errorHandler;
