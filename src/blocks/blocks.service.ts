import { Injectable } from '@nestjs/common';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { Block } from './entities/block.entity';
import { ChainService } from 'src/chain/chain.service';
import * as crypto from 'crypto';

@Injectable()
export class BlocksService {
  constructor(private readonly chainService: ChainService) {}
  create({
    senderPublicKey,
    signature,
    transaction,
  }: {
    transaction: Transaction;
    senderPublicKey: string;
    signature: Buffer;
  }) {
    const verifier = crypto.createVerify('SHA256');
    verifier.update(transaction.toString());

    const isValid = verifier.verify(senderPublicKey, signature);

    if (isValid) {
      console.log('valid signature');
      const newBlock = new Block(this.chainService.lastBlock.hash, transaction);
      this.chainService.pendingBlocks.push(newBlock);
    }
  }
}
