import express from 'express';
import cors from 'cors';
import errorHandler from 'middlewares/error-handler';
import morgan from 'middlewares/morgan';

// Create global app object
const app = express();

app.use(cors());

app.use(morgan);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get('/', (req, res) => res.json({
  status: 200,
  message: 'API Root',
}));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
app.use(errorHandler);

export default app;
