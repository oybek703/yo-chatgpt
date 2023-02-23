import 'colors'
import { DataSource, Repository } from 'typeorm'
import { dataSource } from './connection'
import { User } from './entities/user'
import { Question } from './entities/question'

export class DatabaseManager {
  readonly db: DataSource
  public readonly userRepository: Repository<User>
  public readonly questionRepository: Repository<Question>

  constructor() {
    this.db = dataSource
    this.userRepository = this.db.getRepository(User)
    this.questionRepository = this.db.getRepository(Question)
  }

  async init() {
    try {
      await this.db.initialize()
      console.log(`Successfully connected to database!`.blue.underline)
    } catch (e) {
      if (e instanceof Error) {
        console.error(`Error while connecting to database: ${e.message}`.red.underline)
      }
    }
  }

  // TODO fix any type later
  async saveUser(user: any) {
    const existingUser = await this.userRepository.findOne({ where: { telegramUserId: user.id } })
    if (!existingUser) {
      const newUser = new User()
      newUser.userName = user.username
      newUser.telegramUserId = user.id
      newUser.lastName = user.last_name
      newUser.firstName = user.first_name
      await this.userRepository.save(newUser)
    } else {
      if (existingUser.userName !== user.username) {
        existingUser.userName = user.username
        await this.userRepository.save(existingUser)
      }
    }
  }

  getUserByTelegramId(telegramUserId: number) {
    return this.userRepository.findOneBy({ telegramUserId })
  }

  async saveQuestion(question: Question) {
    const newQuestion = new Question()
    newQuestion.text = question.text
    newQuestion.telegramUserId = question.telegramUserId
    newQuestion.answerText = question.answerText
    newQuestion.askedAt = question.askedAt
    newQuestion.answeredAt = question.answeredAt
    await this.questionRepository.save(newQuestion)
  }
}
