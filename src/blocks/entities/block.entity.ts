import * as crypto from 'crypto';
import { Transaction } from 'src/transactions/entities/transaction.entity';

export class Block {
  public nonce = Math.round(Math.random() * 999999999);

  constructor(
    public prevHash: string | null,
    public transaction: Transaction,
    public validator?: string,
    public ts = Date.now(),
  ) {}

  get hash() {
    const str = JSON.stringify(this);
    const hash = crypto.createHash('sha256');
    hash.update(str).end();
    return hash.digest('hex');
  }
}
