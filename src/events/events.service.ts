import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Event } from './event.entity';
import { User } from '../users/user.entity';
import { UserEvent } from '../user-event/user-event.entity';
import { ChatMessage } from '../chat/chat-message.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event) private eventsRepo: Repository<Event>,
    @InjectRepository(User) private usersRepo: Repository<User>,
    @InjectRepository(UserEvent) private userEventsRepo: Repository<UserEvent>,
    @InjectRepository(ChatMessage) private messagesRepo: Repository<ChatMessage>,
  ) {}

  async create(data: { title: string; description: string; ownerId: number; date?: Date; expireDate?: Date; emoji?: string; location?: string }) {
    const owner = await this.usersRepo.findOneBy({ id: data.ownerId });
    if (!owner) throw new Error('Owner not found');
    const event = this.eventsRepo.create({
      title: data.title,
      description: data.description,
      date: data.date ?? new Date(),
      expireDate: data.expireDate,
      emoji: data.emoji,
      location: data.location,
      owner,
      deleted: false,
    });
    await this.eventsRepo.save(event);
    const roomId = uuid();
    const userEvent = this.userEventsRepo.create({ user: owner, event, roomId });
    await this.userEventsRepo.save(userEvent);
    return { ...event, roomId };
  }

  getMessages(eventId: number) {
    return this.messagesRepo.find({
      where: { userEvent: { event: { id: eventId } } },
      relations: ['userEvent', 'userEvent.user'],
      order: { createdAt: 'ASC' },
    });
  }

  async forUser(userId: number) {
    const entries = await this.userEventsRepo.find({
      where: { user: { id: userId } },
      relations: ['event'],
    });
    return entries.map((ue) => ({ ...ue.event, roomId: ue.roomId }));
  }
}
