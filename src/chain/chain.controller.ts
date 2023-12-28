import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChainService } from './chain.service';

@Controller('chain')
export class ChainController {
  constructor(private readonly chainService: ChainService) {}

  @Get('/')
  getAllPending() {
    return {
      pendingTransactions: this.chainService.pendingBlocks,
      finishedTransactions: this.chainService.chain,
    };
  }

  @Get('/mine')
  mineChain() {
    if (this.chainService.pendingBlocks.length < 1) {
      return {
        message: 'No pending blocks to be mined',
      };
    } else {
      return this.chainService.pendingBlocks[0];
    }
  }

  @Post('/mine')
  mineSolution(
    @Body()
    mineSolution: {
      nonce: number;
      solution: number;
      validator: string;
    },
  ) {
    const pendingBlock = this.chainService.pendingBlocks.find(
      (block) => block.nonce === mineSolution.nonce,
    );

    if (!pendingBlock) {
      return {
        message: 'This block has already been solved',
      };
    } else {
      const validSolution = this.chainService.validateProof(
        mineSolution.nonce,
        mineSolution.solution,
        mineSolution.validator,
      );
      if (validSolution) {
        return {
          message: 'you validated this block',
          block: pendingBlock,
        };
      } else {
        return {
          message: 'wrong solution',
        };
      }
    }
  }
}
