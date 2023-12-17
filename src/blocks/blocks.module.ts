import { Module } from '@nestjs/common';
import { BlocksService } from './blocks.service';
import { BlocksController } from './blocks.controller';

@Module({
  imports: [],
  controllers: [BlocksController],
  providers: [BlocksService],
})
export class BlocksModule {}
