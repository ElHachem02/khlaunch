import * as dotenv from 'dotenv';
dotenv.config();
import {getServer, ServerOptions} from './server';
import SchedulerServiceUsingDatabase from './services/SchedulerServiceUsingDatabase';
import {Controller} from './api/Controller';
import { RouterPublic } from './api/router';

(async () => {
  // required environment variables
  const requiredEnvVars = ['PORT',
    'DATABASE_PORT',
    'DATABASE_HOST',
    'DATABASE_USER', 
    'DATABASE_PASSWORD',
    'DATABASE_NAME',
    'ALLOWED_ORIGINS',
    'ADMIN_PASSWORD'] as const;

const envVars: {[K in (typeof requiredEnvVars)[number]]: string} = {} as any;

for (const name of requiredEnvVars) {
  const value = process.env[name];
  if (!value) {
    const errorMessage = `Could not start server. Missing environment variable: ${name}.`;
    throw new Error(errorMessage);
  }
  envVars[name] = value;
}

// optional environment variables
const PORT = process.env.PORT || 4007;

const serverOptions: ServerOptions = {
  allowedOrigins: envVars.ALLOWED_ORIGINS?.split(','),
};

const server = getServer(serverOptions);

const schedulerService = new SchedulerServiceUsingDatabase();

const controller = new Controller(schedulerService);
const routerPublic = new RouterPublic(controller);


server.use('/private', routerPublic.routes);
server.use('/public', routerPublic.routes);

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
})();
