import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DbService } from './db/db.service';

async function bootstrap() {
  DbService;
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
