import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { ChatModule } from './chat/chat.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';
import { Event } from './events/event.entity';
import { UserEvent } from './user-event/user-event.entity';
import { ChatMessage } from './chat/chat-message.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT ?? '5432'),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'postgres',
      database: process.env.DB_NAME || 'events',
      synchronize: true,
      entities: [User, Event, UserEvent, ChatMessage],
    }),
    UsersModule,
    EventsModule,
    ChatModule,
    AuthModule,
  ],
})
export class AppModule {}
