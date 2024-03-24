import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createUser';
import { AuthService } from './auth.service';
import { SigninUserDto } from './dtos/signinUser.dto';
import { authGuard } from './auth.guard';
import { UserOutput } from './interceptor/user.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('user')
@UserOutput(UserDto)
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.authService.signup(body);

    return user;
  }

  @Post('/signin')
  async signin(@Body() body: SigninUserDto) {
    const user = await this.authService.signin(body.email, body.password);

    return user;
  }

  @Get('/:id')
  @UseGuards(authGuard)
  async whoami(@Param('id') id: string) {
    const user = await this.userService.findId(parseInt(id));
    return user;
  }
}
