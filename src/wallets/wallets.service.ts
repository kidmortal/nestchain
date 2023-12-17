import { Injectable } from '@nestjs/common';
import * as crypto from 'node:crypto';

@Injectable()
export class WalletsService {
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

  sendMoney() {
    return 'tba';
  }
}
