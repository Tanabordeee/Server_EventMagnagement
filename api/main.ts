import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module'; 
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';

dotenv.config();

let cachedServer: any;

async function buildServer() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });
  app.setGlobalPrefix("api");
  await app.init();
  return app.getHttpAdapter().getInstance();
}

export default async (req, res) => {
  if (!cachedServer) {
    cachedServer = await buildServer();
  }
  return cachedServer(req, res);
};
