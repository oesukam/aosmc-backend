import express from 'express';
import cors from 'cors';
import errorhandler from 'errorhandler';

import logger from '@helpers/logger';
import morgan from '@middlewares/morgan';


const isProduction = process.env.NODE_ENV === 'production';

// Create global app object
const app = express();

app.use(cors());

app.use(morgan);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (!isProduction) {
  app.use(errorhandler());
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use((err, req, res) => {
    logger.log(err.stack);

    res.status(err.status || 500);

    return res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

export default app;
