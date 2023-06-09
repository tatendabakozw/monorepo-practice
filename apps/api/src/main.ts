/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import express from 'express';
import * as path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet'

// user defined imports
import auth from './routes/auth/auth';

// port to listen on development
const port = process.env.PORT || 3333;

const app = express();

// cors option
const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: process.env.NODE_ENV === "development" ? '*' : allowedOrigins,
};

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(helmet())
app.use(express.urlencoded({ extended: true }));
app.use(morgan('common'));
app.use(express.json());
app.use(cors(options));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to gateway api!' });
});

// user defined routes
app.use('/api/auth', auth);

//not found handler
app.use((req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

//error handling middleware
app.use((error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  console.log(error);
  res.send({
    message: error.message,
    stack:
      process.env.NODE_ENV === "production"
        ? "you are in production"
        : error.stack,
  });
});

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
