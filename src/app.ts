import express, { Express } from 'express';

import { QuizzAppServer } from './setupServer';

import connectionDatabase from './setupDatabase';
import { config } from './config';

class Application {
  public initialize(): void {
    this.loadConfig();
    connectionDatabase();

    const app: Express = express();
    const server: QuizzAppServer = new QuizzAppServer(app);
    server.start();
  }

  private loadConfig(): void {
    config.validateConfig();
    config.cloudinaryConfig();
  }
}

const application: Application = new Application();
application.initialize();
