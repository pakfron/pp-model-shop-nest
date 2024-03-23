import { BadRequestException, Body, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createUser';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
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

    const salt = 10;
    const hash = await bcrypt.hash(password, salt);

    const user = await this.userService.createUser(username, hash, email);

    const payload = { userId: user.id, role: user.role };

    return {
      acess_token: await this.jwtService.signAsync(payload),
      userId:user.id,
      role:user.role
    };
  }
}
