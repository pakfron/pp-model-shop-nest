import {
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Unique(['username'])
@Unique(['email'])
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'username' })
  username: string;

  @Column()
  password: string;
  @Column({ name: 'email' })
  email: string;
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;
}
