import {Request, Response, NextFunction, Router as expressRouter} from 'express';
import {Controller} from './controller';
import {authenticateAdmin} from '../middleware/Auth';

/**
 * asyncHandler - A utility wrapper for Express route handlers.
 *
 * Why is it needed?
 * Express, by design, doesn't handle asynchronous errors thrown inside async functions or Promise rejections.
 * Typically, if an error is thrown inside an async route handler, it would result in an unhandled promise rejection,
 * potentially leading to undesirable application behavior or even a crash.
 *
 * How does it work?
 * This function wraps an asynchronous route handler, ensuring that if a Promise rejection (or error)
 * occurs inside that handler, the error is caught and passed to the next middleware in line.
 * In Express, this typically would be an error-handling middleware.
 *
 * How to use it?
 * Instead of:
 *   app.get('/', async (req, res) => { ... });
 * Use:
 *   app.get('/', asyncHandler(async (req, res) => { ... }));
 *
 * @param {Function} fn - The async function representing the route handler.
 * @returns {Function} - A function ready to be used as an Express route handler.
 */
function asyncHandler(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(err => {
      return next(err);
    });
  };
}

export class RouterPublic {
  readonly routes: expressRouter;

  constructor(private controller: Controller) {
    this.routes = expressRouter();
    this.setupRoutes();
  }

  private setupRoutes() {
    this.routes.get(
      '/open-slots', 
      asyncHandler((req: Request, res: Response) => this.controller.getOpenSlots(req, res))
    );

    this.routes.post(
      '/activity',
      asyncHandler((req: Request, res: Response) => this.controller.addActivity(req, res))
    );
  }
}

  export class RouterPrivate {
  readonly routes: expressRouter;

  constructor(private controller: Controller) {
    this.routes = expressRouter();
    this.routes.use(authenticateAdmin);
    this.setupRoutes();
  }

  private setupRoutes() {
    this.routes.get(
      '/activities',
      asyncHandler((req: Request, res: Response) => this.controller.getActivities(req, res))
    );

    this.routes.delete(
      '/activity/:id',
      asyncHandler((req: Request, res: Response) => this.controller.removeActivity(req, res))
    );
  }
}