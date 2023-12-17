import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { BlocksService } from 'src/blocks/blocks.service';
import { Transaction } from 'src/transactions/entities/transaction.entity';

@Injectable()
export class WalletsService {
  constructor(private readonly blockService: BlocksService) {}
  create() {
    const keypair = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
      },
    });
    return {
      publicKey: keypair.publicKey,
      publicKeyExplanation:
        'This key is used to receive currency from another user',
      privateKey: keypair.privateKey,
      privateKeyExplanation:
        'This key is to sign transactions ,keep it private and only visible by you',
    };
  }

  sendMoney({
    amount,
    payeePublicKey,
    privateKey,
    publicKey,
  }: {
    amount: number;
    publicKey: string;
    privateKey: string;
    payeePublicKey: string;
  }) {
    const transaction = new Transaction(amount, publicKey, payeePublicKey);
    const sign = crypto.createSign('SHA256');
    sign.update(transaction.toString()).end();
    const signature = sign.sign(privateKey);
    this.blockService.create({
      senderPublicKey: publicKey,
      signature,
      transaction,
    });
    return 'transaction sent';
  }
}
