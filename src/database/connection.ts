import { DataSource } from 'typeorm'
import { User } from './entities/user'
import { Question } from './entities/question'

const isDevelopment = process.env.NODE_ENV === 'development'

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  database: process.env.PGDATABASE,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  entities: [User, Question],
  synchronize: isDevelopment
})
