import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';

import { BlocksModule } from 'src/blocks/blocks.module';

@Module({
  imports: [BlocksModule],
  controllers: [WalletsController],
  providers: [WalletsService],
})
export class WalletsModule {}
