import { BadRequestException, Body, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createUser';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async signup({ email, password, confirmPassword, username }: CreateUserDto) {
    if (password !== confirmPassword) {
      throw new BadRequestException('password is not match');
    }
    const usernameDup = await this.userService.findUser(username);
    if (usernameDup) {
      throw new BadRequestException('username already exists');
    }
    const emailDup = await this.userService.findEmail(email);
    if (emailDup) {
      throw new BadRequestException('email already exists');
    }
    return this.userService.createUser(username, password, email);
  }
}
