import { Injectable } from '@nestjs/common';
import { Transaction } from 'src/entities/transaction.entity';
import { ChainService } from 'src/chain/chain.service';
import * as crypto from 'crypto';
import { SocketsService } from 'src/sockets/sockets.service';
import { Block } from 'src/entities/block.entity';

@Injectable()
export class BlocksService {
  constructor(
    private readonly chainService: ChainService,
    private readonly socket: SocketsService,
  ) {}
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
      this.socket.broadcast('new_block_availabe', newBlock.nonce);
    }
  }
}
