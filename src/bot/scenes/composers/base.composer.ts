import { Composer } from 'telegraf'
import { BotContext } from '../../../interfaces/bot.interfaces'
import { DatabaseManager } from '../../../database/database-manager'

export class BaseComposer {
  constructor(protected readonly dbManager: DatabaseManager) {}

  createComposer = (handler: (composer: Composer<BotContext>) => void): Composer<BotContext> => {
    const composer = new Composer<BotContext>()
    handler(composer)
    return composer
  }
}
