import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { Block } from 'src/entities/block.entity';
import { Transaction } from 'src/entities/transaction.entity';

@Injectable()
export class ChainService {
  pendingBlocks: Block[] = [];
  chain: Block[] = [
    new Block(null, new Transaction(100, 'genesis', 'satoshi')),
  ];

  constructor() {}

  get lastBlock() {
    return this.chain[this.chain.length - 1];
  }

  mine(nonce: number) {
    let solution = 1;
    console.log('Mining...');

    while (true) {
      const hash = crypto.createHash('MD5');
      hash.update((nonce + solution).toString()).end();
      const attempt = hash.digest('hex');

      if (attempt.substring(0, 5) === '00000') {
        console.log(`Solved ${solution}`);
        return solution;
      }
      solution += 1;
    }
  }

  validateProof(nonce: number, solution: number, validator: string) {
    const hash = crypto.createHash('MD5');
    hash.update((nonce + solution).toString()).end();
    const attempt = hash.digest('hex');
    if (attempt.substring(0, 6) === '000000') {
      console.log(`Solution is valid`);
      const validatedBlockIndex = this.pendingBlocks.findIndex(
        (block) => block.nonce === nonce,
      );
      if (validatedBlockIndex === -1) {
        return false;
      }
      const block = this.pendingBlocks.splice(validatedBlockIndex, 1)[0];
      block.validator = validator;
      this.chain.push(block);
      return true;
    } else {
      console.log(`Solution is wrong`);
      return false;
    }
  }
}
