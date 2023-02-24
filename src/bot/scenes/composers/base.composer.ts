import { Composer } from 'telegraf'
import { BotContext } from '../../../interfaces/bot.interfaces'
import { DatabaseManager } from '../../../database/database-manager'
import { LanguageTextKeys } from '../../constants'
import { I18nClass } from '../../locales/i18n.class'

export class BaseComposer {
  constructor(protected readonly dbManager: DatabaseManager) {}

  createComposer = (handler: (composer: Composer<BotContext>) => void): Composer<BotContext> => {
    const composer = new Composer<BotContext>()
    composer.use(I18nClass.getInstance() as any)
    handler(composer)
    return composer
  }

  checkBackText = (text: string, ctx: BotContext) => {
    return text === ctx.translate(LanguageTextKeys.backBtnText)
  }

  checkStartCommand = (text: string) => {
    return text === LanguageTextKeys.startCommand
  }
}
