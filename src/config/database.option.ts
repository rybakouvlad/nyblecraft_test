import { ConnectionOptions } from 'typeorm';
import { join } from 'path';
import { UserDB } from '../user/entities/user.entity';

export const optionsDB: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  //   migrationsRun: true,
  logging: false,
  //   entities: [join(__dirname, '../**/entities/*.entity{.ts,.js}')],
  entities: [UserDB],
  //   migrations: [join(__dirname, '../migrations/*{.ts,.js}')],
  cli: {
    // migrationsDir: 'src/migrations/',
    entitiesDir: 'src/**/entities/*.entity{.ts,.js}',
  },
};
