import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';

/**
 * Augments the Express.Request interface with custom properties.
 *
 * Within the Express request object, a new property `firstHx` is declared
 * which contains an optional `user` property of type `User`.
 *
 * This is used to extend the default Express request object to contain custom
 * data that may be set in middlewares or other application logic.
 */
declare global {
  namespace Express {
    interface Request {
      khlaunch?: {
        password?: string;
      };
    }
  }
}
export interface ServerOptions {
  allowedOrigins?: string[];
}
/**
 * Returns an express server instance with configured middleware
 * @param {ServerOptions} options
 */
export function getServer(options: ServerOptions): express.Application {
  const server = express();
  const corsConfig = {
    origin: options?.allowedOrigins,
    credentials: true
  };

  server.set('trust proxy', true);
  server.use(cors(corsConfig));
  server.use(express.json());

  return server;
}
