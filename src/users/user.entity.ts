import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserEvent } from '../user-event/user-event.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  resetPassCode?: string;

  @Column({ unique: true })
  email!: string;

  @Column({ nullable: true })
  profilePhotoId?: number;

  @Column({ type: 'date', nullable: true })
  birthDate?: Date;

  @OneToMany(() => UserEvent, (ue) => ue.user)
  userEvents!: UserEvent[];
}
