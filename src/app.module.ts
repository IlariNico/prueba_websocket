import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { ChatModule } from './chat/chat.module';
import { User } from './users/user.entity';
import { Event } from './events/event.entity';
import { UserEvent } from './user-event/user-event.entity';
import { ChatMessage } from './chat/chat-message.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      synchronize: true,
      entities: [User, Event, UserEvent, ChatMessage],
    }),
    UsersModule,
    EventsModule,
    ChatModule,
  ],
})
export class AppModule {}
