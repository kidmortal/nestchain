import { Injectable } from '@nestjs/common';
import { CreateBlockDto } from './dto/create-block.dto';

@Injectable()
export class BlocksService {
  create(createBlockDto: CreateBlockDto) {
    console.log(createBlockDto);
    return 'This action adds a new block';
  }
}
