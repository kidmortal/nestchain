import { Injectable } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'http';
import { Socket } from 'socket.io';

@Injectable()
export class SocketsService {
  @WebSocketServer() server: Server;
  wsClients: Socket[] = [];

  broadcast(event, message: any) {
    const broadCastMessage = JSON.stringify(message);
    for (const c of this.wsClients) {
      c.emit(event, broadCastMessage);
      console.log(`new block available nonce: ${broadCastMessage}`);
    }
  }
}
