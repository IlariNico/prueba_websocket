import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  async create(data: Partial<User>) {
    const user = this.usersRepo.create(data);
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
    return this.usersRepo.save(user);
  }

  findByUsername(username: string) {
    return this.usersRepo.findOne({ where: { username } });
  }

  findById(id: number) {
    return this.usersRepo.findOne({ where: { id } });
  }
}
