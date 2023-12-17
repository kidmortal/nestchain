import { NestFactory } from '@nestjs/core';
import { BlockChainModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(BlockChainModule);
  await app.listen(3000);
}
bootstrap();
