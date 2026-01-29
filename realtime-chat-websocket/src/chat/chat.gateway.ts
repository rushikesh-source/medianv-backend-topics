import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, WebSocket } from 'ws';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: WebSocket) {
    console.log('Client connected');

    client.send(
      JSON.stringify({
        event: 'connected',
        data: {
          message: 'Connected to WebSocket server',
        },
      }),
    );
  }

  handleDisconnect() {
    console.log('Client disconnected');
  }

  @SubscribeMessage('send_message')
  handleMessage(@MessageBody() payload: { message: string }) {
    console.log('Message received:', payload);
    console.log("payload.message", payload.message);
    
    const response = JSON.stringify({
      event: 'receive_message',
      data: {
        message: payload.message,
        timestamp: new Date().toISOString(),
      },
    });

    this.server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(response);
      }
    });
  }
}
