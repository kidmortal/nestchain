import { NestFactory } from '@nestjs/core';
import { BlockChainModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT;
  const app = await NestFactory.create(BlockChainModule);

  app.enableCors();

  await app.listen(port || 3000);
}
bootstrap();
