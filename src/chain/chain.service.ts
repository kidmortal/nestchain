import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { Block } from 'src/blocks/entities/block.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';

@Injectable()
export class ChainService {
  public static instance = new ChainService();
  pendingBlocks: Block[];
  chain: Block[];

  constructor() {
    this.chain = [new Block(null, new Transaction(100, 'genesis', 'satoshi'))];
    this.pendingBlocks = [];
  }

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

  validateProof(nonce: number, solution: number) {
    const hash = crypto.createHash('MD5');
    hash.update((nonce + solution).toString()).end();
    const attempt = hash.digest('hex');
    if (attempt.substring(0, 4) === '0000') {
      console.log(`Solution is valid`);
      const validatedBlockIndex = this.pendingBlocks.findIndex(
        (block) => block.nonce === nonce,
      );
      const block = this.pendingBlocks.splice(validatedBlockIndex, 1)[0];
      this.chain.push(block);
      return true;
    } else {
      console.log(`Solution is wrong`);
      return false;
    }
  }

  addBlock(
    transaction: Transaction,
    senderPublicKey: string,
    signature: Buffer,
  ) {
    const verifier = crypto.createVerify('SHA256');
    verifier.update(transaction.toString());

    const isValid = verifier.verify(senderPublicKey, signature);

    if (isValid) {
      console.log('valid transaction');
      const newBlock = new Block(this.lastBlock.hash, transaction);
      const proof = this.mine(newBlock.nonce);
      if (this.validateProof(newBlock.nonce, proof)) {
        this.chain.push(newBlock);
      }
    }
  }
}
