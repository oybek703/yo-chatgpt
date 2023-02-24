import { User } from '../database/entities/user'
import { format } from 'date-fns'
import { Question } from '../database/entities/question'

const dateFormat = 'dd-MM-yyyy HH:mm:ss'

export function normalizeString(text: string) {
  return text.replace(/  +/gm, '')
}

export function formatUserStartedBot(user: User, usersCount: number) {
  const { firstName, lastName, userName, createdAt, telegramUserId } = user
  return normalizeString(`
    <a href="tg://user?id=${telegramUserId}">${usersCount}. ${firstName} ${
    lastName ? lastName : ''
  }</a> ${userName ? `@${userName}` : ''} started bot at ${format(createdAt as Date, dateFormat)}`)
}

export function formatSendQuestion(
  {
    first_name,
    last_name,
    username,
    id
  }: {
    first_name: string
    last_name?: string
    username?: string
    id: number
  },
  question: Question,
  questionsCount: number
) {
  return normalizeString(`
    💡 ${questionsCount}. New question: 
    ⏲ Asked at "${format(question.askedAt as Date, dateFormat)}"
    ⌛ Answered at "${format(question.answeredAt as Date, dateFormat)}"
    👤 User "${first_name} ${last_name ? last_name : ''}  ${username ? ` @${username}` : ''}"
    ❓ Question "${question.text}" 
    ✅ Answer "${question.answerText}" 
  `)
}
