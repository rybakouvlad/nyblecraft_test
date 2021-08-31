import { ConnectionOptions } from 'typeorm';
import { AuthDB } from '../auth/entity/auth.entity';
import { UserDB } from '../user/entities/user.entity';

export const optionsDB: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  logging: false,
  entities: [UserDB, AuthDB],

  cli: {
    entitiesDir: 'src/**/entities/*.entity{.ts,.js}',
  },
};
