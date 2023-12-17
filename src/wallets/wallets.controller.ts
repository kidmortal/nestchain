import { Controller, Get, Post } from '@nestjs/common';
import { WalletsService } from './wallets.service';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Get('/create')
  create() {
    return this.walletsService.create();
  }

  @Post('/sendMoney')
  sendMoney() {
    return this.walletsService.sendMoney();
  }
}
