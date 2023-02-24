import { User } from '../database/entities/user'
import { format } from 'date-fns'

export function normalizeString(text: string) {
  return text.replace(/  +/gm, '')
}

export function formatJoinTime(user: User) {
  const { firstName, lastName, userName, createdAt, telegramUserId } = user
  return normalizeString(`
    <a href="tg://user?id=${telegramUserId}">${firstName} ${lastName ? lastName : ''}</a> ${
    userName && `@${userName}`
  } started bot at ${format(createdAt as Date, 'dd-MM-yyyy HH:mm:ss')}`)
}
