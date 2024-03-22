import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  createUser(username: string, password: string, email: string) {
    const user = this.repo.create({
      username: username,
      password: password,
      email: email,
    });

    return this.repo.save(user);
  }

  findUser(username: string) {
    return this.repo.findOne({ where: { username } });
  }

  findEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }
}
