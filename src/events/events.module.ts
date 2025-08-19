import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { Event } from './event.entity';
import { User } from '../users/user.entity';
import { UserEvent } from '../user-event/user-event.entity';
import { ChatMessage } from '../chat/chat-message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, User, UserEvent, ChatMessage])],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
