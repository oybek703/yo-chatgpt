import { DatabaseManager } from '../database/database-manager'
import { I18n } from '@grammyjs/i18n'
import { LanguageTextKeys } from './constants'
import { I18nClass } from './locales/i18n.class'
import { BotContext } from '../interfaces/bot.interfaces'
import { BotCommand } from 'telegraf/typings/core/types/typegram'
import { Telegraf } from 'telegraf'
import LocalSession from 'telegraf-session-local'

export class Handlers {
  private readonly dbManager: DatabaseManager
  private readonly i18n: I18n<BotContext>
  private readonly session: LocalSession<BotContext>
  private commands: BotCommand[] = [
    { command: LanguageTextKeys.startCommand, description: 'Start bot' }
  ]

  constructor(private readonly bot: Telegraf<BotContext>, dbManager: DatabaseManager) {
    if (dbManager) this.dbManager = dbManager
    this.i18n = I18nClass.getInstance()
    this.session = new LocalSession()
  }

  init = async () => {
    this.bot.use(this.session.middleware())
    this.bot.use(this.i18n)
    await this.setBotCommands()
    this.onStartCommand()
    await this.bot.launch()
  }

  setBotCommands = () => this.bot.telegram.setMyCommands(this.commands)

  onStartCommand = () => {
    this.bot.command('start', async (ctx: BotContext) => {
      // await this.dbManager.saveUser(ctx.message?.from)
      console.log(ctx.session)
      console.log(ctx.message)
    })
  }
}
