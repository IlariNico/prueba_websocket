import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Event } from '../events/event.entity';
import { ChatMessage } from '../chat/chat-message.entity';

@Entity()
export class UserEvent {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  roomId!: string;

  @ManyToOne(() => User, (user) => user.userEvents)
  user!: User;

  @ManyToOne(() => Event, (event) => event.userEvents)
  event!: Event;

  @OneToMany(() => ChatMessage, (msg) => msg.userEvent)
  messages!: ChatMessage[];
}
