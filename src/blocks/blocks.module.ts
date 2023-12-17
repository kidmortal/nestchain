import { Module } from '@nestjs/common';
import { BlocksService } from './blocks.service';
import { ChainModule } from 'src/chain/chain.module';

@Module({
  imports: [ChainModule],
  providers: [BlocksService],
  exports: [BlocksService],
})
export class BlocksModule {}
