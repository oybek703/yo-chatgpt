import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'questions' })
export class Question {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  text: string

  @Column({ type: 'bigint' })
  telegramUserId: number

  @Column({ type: 'text' })
  answerText: string

  @CreateDateColumn()
  askedAt?: Date

  @UpdateDateColumn()
  answeredAt?: Date
}
