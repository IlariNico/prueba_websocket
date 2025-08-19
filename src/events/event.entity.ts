import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { UserEvent } from '../user-event/user-event.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'datetime' })
  date!: Date;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column({ type: 'datetime', nullable: true })
  expireDate?: Date;

  @Column({ default: false })
  deleted!: boolean;

  @Column({ nullable: true })
  emoji?: string;

  @Column({ nullable: true })
  location?: string;

  @ManyToOne(() => User)
  owner!: User;

  @OneToMany(() => UserEvent, (ue) => ue.event)
  userEvents!: UserEvent[];
}
