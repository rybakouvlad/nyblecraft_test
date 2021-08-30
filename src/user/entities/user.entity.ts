import { IsEmail, IsNotEmpty } from 'class-validator';
import { Column, Entity } from 'typeorm';
@Entity()
export class UserDB {
  @Column({ primary: true, unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  image?: string;

  @Column({ nullable: true })
  pdf?: string;
}
