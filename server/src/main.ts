import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from '@nestjs/common';

const PORT = process.env.PORT || 5000;

async function server(PORT) {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
  return PORT;
}

server(PORT).then((PORT) => console.log(`SERVER STARTED ON PORT: ${PORT}`));
