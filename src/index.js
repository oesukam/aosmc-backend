import app from './app';
import logger from './helpers/logger';

const { PORT = 3000 } = process.env;

// finally, let's start our server...
const server = app.listen(PORT, () => {
  logger.info(`Running on http://localhost:${PORT}\n`);
});

export default server;
