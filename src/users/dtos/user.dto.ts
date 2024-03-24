import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  access_token: string;
  @Expose()
  userId: number;
  @Expose()
  role: string;
  @Expose()
  email: string;
  @Expose()
  username: string;
}
