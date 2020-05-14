import morgan from 'morgan';
import dayjs from 'dayjs';
import logger from '../helpers/logger';

export default morgan((tokens, req, res) => [
  '\n',
  dayjs().format('YYYY-MM-DD hh:mm:ss:SS'),
  tokens.method(req, res),
  tokens.url(req, res),
  tokens.status(req, res),
  tokens.res(req, res, 'content-length'),
  '-',
  tokens['response-time'](req, res),
  'ms',
  '\n',
  '-'.repeat(100),
  `\nHeaders: ${JSON.stringify(req.headers)}\n`,
].join(' '), { stream: logger.stream });
