import casesHandler from 'jest-in-case';
import errorHandler from 'middlewares/error-handler';
import { SERVER_ERROR } from 'constants/status-codes';

jest.mock('helpers/logger');

const req = {};
const res = { json: jest.fn(() => res), status: jest.fn(() => res) };
const next = jest.fn();

const errorStatus = (error, status) => {
  error.status = status;
  return error;
};

const cases = [
  { name: 'res', error: errorStatus(new Error('Bad request'), 400), status: 400, isProd: true },
  { name: 'res', error: errorStatus(new Error('Internal error request')), status: SERVER_ERROR },
  { name: 'res', error: errorStatus(new Error('Unauthorized Access'), 401), status: 401 },
  { name: 'res', error: errorStatus(new Error('Bad request'), 400), status: 400 },
].map(({
  name,
  error,
  status,
  isProd,
}) => ({
  name: `should call ${name}.status with ${status}`,
  inputs: { req, res, next },
  outputs: { status, message: error.message },
  error,
  isProd,
}));

casesHandler('errorHandler(error, req, res)', ({
  error,
  inputs,
  outputs,
  isProd,
}) => {
  const returnedJSON = {
    status: outputs.status,
    message: outputs.message,
  };
  if (isProd) {
    process.env.NODE_ENV = 'production';
  } else {
    process.env.NODE_ENV = 'development';
    returnedJSON.error = error;
  }

  errorHandler(error, inputs.req, inputs.res);
  expect(inputs.res.status).toBeCalledWith(outputs.status);
  expect(inputs.res.json).toBeCalledWith(returnedJSON);
}, cases);
