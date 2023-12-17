import { Body, Controller, Get, Post } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { SendMoneyDto } from './dto/send-money.dto';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Get('/create')
  create() {
    return this.walletsService.create();
  }

  @Post('/sendMoney')
  sendMoney(@Body() sendMoneyDto: SendMoneyDto) {
    return this.walletsService.sendMoney(sendMoneyDto);
  }
}
