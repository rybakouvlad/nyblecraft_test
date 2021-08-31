import { Column, Entity, PrimaryColumn } from 'typeorm';
import { IuserResponse } from '../userResponce.interface';
@Entity()
export class UserDB {
  @PrimaryColumn({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  image?: string;

  @Column({ type: 'bytea', nullable: true })
  pdf?: Buffer;

  static toResponse(user: UserDB): IuserResponse {
    return {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image,
      pdf: user.pdf ? true : false,
    };
  }
}
