import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
// โหลดไฟล์ .env
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });
  app.setGlobalPrefix("api");
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
