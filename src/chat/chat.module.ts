import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatGateway } from './chat.gateway';
import { ChatMessage } from './chat-message.entity';
import { User } from '../users/user.entity';
import { Event } from '../events/event.entity';
import { UserEvent } from '../user-event/user-event.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatMessage, User, Event, UserEvent]),
    AuthModule,
  ],
  providers: [ChatGateway],
})
export class ChatModule {}
