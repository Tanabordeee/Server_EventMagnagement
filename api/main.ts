import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module'; 
import * as dotenv from 'dotenv';

dotenv.config();

let cachedServer: any;

async function buildServer() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://client-event-magnagement.vercel.app',
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
