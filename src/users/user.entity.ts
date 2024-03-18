import { Column, Entity, PrimaryColumn, Unique } from 'typeorm';

// export enum UserRole {
//   ADMIN = 'admin',
//   USER = 'user',
// }

@Unique(['username'])
@Unique(['email'])
@Entity()
export class User {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'username' })
  username: string;

  @Column()
  password: string;
  @Column({ name: 'email' })
  email:string
  @Column()
  role:string;
}
