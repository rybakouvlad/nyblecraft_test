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

  @Column({ type: 'bytea', nullable: true })
  pdf?: Buffer;
}
