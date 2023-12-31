import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  SubscribeMessage,
  ConnectedSocket,
} from '@nestjs/websockets';
import { SocketsService } from './sockets.service';
import { Socket } from 'socket.io';
import { ChainService } from 'src/chain/chain.service';

@WebSocketGateway()
export class SocketsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly socket: SocketsService,
    private readonly chain: ChainService,
  ) {}

  @SubscribeMessage('block_solve')
  handleEvent(
    @MessageBody() data: { nonce: number; solution: number; name: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(data);
    if (!data.name || !data.nonce || !data.solution) {
      return client.emit('block_solve', {
        success: false,
        message:
          'wrong format, needs to be a json, {"nonce": number, solution: number, name: string}',
      });
    }
    const validSolution = this.chain.validateProof(
      data.nonce,
      data.solution,
      data.name,
    );
    if (validSolution) {
      this.socket.broadcast('blockchain_updated', {
        chain: this.chain.chain,
        pendingBlocks: this.chain.pendingBlocks,
      });
      return client.emit('block_solve', {
        success: true,
        message: 'Block validated',
      });
    } else {
      return client.emit('block_solve', {
        success: false,
        message: 'Validation failed',
      });
    }
  }

  handleConnection(client: Socket) {
    console.log(`socket ${client.id} connected`);
    this.socket.wsClients.push(client);
  }

  handleDisconnect(client: Socket) {
    for (let i = 0; i < this.socket.wsClients.length; i++) {
      if (this.socket.wsClients[i] === client) {
        const disconnectedSocket = this.socket.wsClients.splice(i, 1);
        console.log(`socket ${disconnectedSocket[0].id} disconnected`);
        break;
      }
    }
  }
}
