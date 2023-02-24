import { DatabaseManager } from '../database/database-manager'
import { I18n } from '@grammyjs/i18n'
import { changeLangWizardId, LanguageTextKeys } from './constants'
import { I18nClass } from './locales/i18n.class'
import { BotContext } from '../interfaces/bot.interfaces'
import { BotCommand } from 'telegraf/typings/core/types/typegram'
import { session, Telegraf } from 'telegraf'
import { BotScenes } from './scenes/bot.scenes'
import { getSettingsKeyboard } from './keyboards'
import { backToMain } from '../utils/bot.utils'

export class Handlers {
  scenes: BotScenes
  private readonly dbManager: DatabaseManager
  private readonly i18n: I18n<BotContext>
  private commands: BotCommand[] = [
    { command: LanguageTextKeys.startCommand, description: 'Start bot' }
  ]

  constructor(private readonly bot: Telegraf<BotContext>, dbManager: DatabaseManager) {
    if (dbManager) this.dbManager = dbManager
    this.i18n = I18nClass.getInstance()
    this.scenes = new BotScenes(bot, this.dbManager)
  }

  init = async () => {
    await this.setBotCommands()
    this.bot.use(session())
    this.scenes.init()
    this.bot.use(this.i18n)
    this.onStartCommand()
    this.onSettings()
    this.onNavigateBack()
    this.onAboutBot()
    await this.bot.launch()
  }

  setBotCommands = () => this.bot.telegram.setMyCommands(this.commands)

  onStartCommand = () => {
    this.bot.start(async (ctx: BotContext) => {
      await this.dbManager.saveUser(ctx.message?.from)
      await ctx.replyWithHTML(ctx.translate(LanguageTextKeys.helloText))
      return backToMain(ctx)
    })
  }

  onSettings = () => {
    this.bot.hears(I18nClass.textInLocales(LanguageTextKeys.settingsBtnText), (ctx: BotContext) => {
      const settingsKeyboard = getSettingsKeyboard(ctx)
      return ctx.reply(ctx.translate(LanguageTextKeys.chooseSettingsText), settingsKeyboard)
    })
    this.bot.hears(I18nClass.textInLocales(LanguageTextKeys.changeLanguageBtnText), ctx =>
      ctx.scene.enter(changeLangWizardId)
    )
  }

  onNavigateBack = () => {
    this.bot.hears(I18nClass.textInLocales(LanguageTextKeys.backBtnText), ctx => backToMain(ctx))
  }

  onAboutBot = () => {
    this.bot.hears(I18nClass.textInLocales(LanguageTextKeys.aboutBotBtnText), ctx =>
      ctx.reply(ctx.translate(LanguageTextKeys.aboutBotText))
    )
  }
}
