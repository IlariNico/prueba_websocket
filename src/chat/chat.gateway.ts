import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer } from '@nestjs/websockets';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Server, Socket } from 'socket.io';
import { User } from '../users/user.entity';
import { Event } from '../events/event.entity';
import { UserEvent } from '../user-event/user-event.entity';
import { ChatMessage } from './chat-message.entity';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server!: Server;

  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    @InjectRepository(Event) private eventsRepo: Repository<Event>,
    @InjectRepository(UserEvent) private userEventsRepo: Repository<UserEvent>,
    @InjectRepository(ChatMessage) private messagesRepo: Repository<ChatMessage>,
  ) {}

  @SubscribeMessage('join')
  handleJoin(@MessageBody() roomId: string, @ConnectedSocket() client: Socket) {
    client.join(roomId);
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() data: { roomId: string; userId: number; message: string },
  ) {
    const event = await this.userEventsRepo.findOne({ where: { roomId: data.roomId }, relations: ['event'] });
    if (!event) return;

    let userEvent = await this.userEventsRepo.findOne({
      where: { roomId: data.roomId, user: { id: data.userId }, event: { id: event.event.id } },
      relations: ['user', 'event'],
    });

    if (!userEvent) {
      const user = await this.usersRepo.findOneBy({ id: data.userId });
      if (!user) return;
      userEvent = this.userEventsRepo.create({ user, event: event.event, roomId: data.roomId });
      await this.userEventsRepo.save(userEvent);
    }

    const msg = this.messagesRepo.create({ message: data.message, userEvent });
    await this.messagesRepo.save(msg);
    this.server.to(data.roomId).emit('message', {
      id: msg.id,
      message: msg.message,
      user: { id: userEvent.user.id, username: userEvent.user.username },
      createdAt: msg.createdAt,
    });
  }
}
