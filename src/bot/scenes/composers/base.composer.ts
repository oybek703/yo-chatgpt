import { Composer } from 'telegraf'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { BotContext } from '../../../interfaces/bot.interfaces'
import { DatabaseManager } from '../../../database/database-manager'

export class BaseComposer {
  constructor(protected readonly dbManager: DatabaseManager) {}

  createComposer = (handler: (composer: Composer<BotContext>) => void): Composer<BotContext> => {
    const composer = new Composer<BotContext>()
    handler(composer)
    return composer
  }

  readImage = async (imageName: string) => {
    return readFile(join(process.cwd(), `./src/images/${imageName}`))
  }

  getLogoBuffer = async (logoName: string = '') => {
    return await this.readImage(logoName || 'linker.png')
  }
}
