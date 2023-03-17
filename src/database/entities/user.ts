import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  firstName?: string

  @Column({ nullable: true })
  lastName?: string

  @Column({ nullable: true })
  userName?: string

  @Column({ type: 'text' })
  telegramUserId: number

  @CreateDateColumn()
  createdAt?: Date

  @UpdateDateColumn()
  updatedAt?: Date
}
