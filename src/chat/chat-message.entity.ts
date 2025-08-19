import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { UserEvent } from '../user-event/user-event.entity';

@Entity()
export class ChatMessage {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  message!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => UserEvent, (ue) => ue.messages, { eager: true })
  userEvent!: UserEvent;
}
