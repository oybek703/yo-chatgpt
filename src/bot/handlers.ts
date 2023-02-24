import { DatabaseManager } from '../database/database-manager'
import { I18n } from '@grammyjs/i18n'
import { changeLangWizardId, LanguageTextKeys } from './constants'
import { I18nClass } from './locales/i18n.class'
import { BotContext } from '../interfaces/bot.interfaces'
import { BotCommand } from 'telegraf/typings/core/types/typegram'
import { Telegraf } from 'telegraf'
import LocalSession from 'telegraf-session-local'
import { ScenesBase } from './scenes/scenes.base'
import { getMainKeyboard, getSettingsKeyboard } from './keyboards'

export class Handlers {
  scenes: ScenesBase
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
    this.scenes = new ScenesBase(bot, this.dbManager)
  }

  init = async () => {
    await this.setBotCommands()
    this.bot.use(this.session.middleware())
    this.scenes.init()
    this.bot.use(this.i18n)
    this.onStartCommand()
    this.onSettings()
    this.onNavigateBack()
    this.onAboutBot()
    await this.bot.launch()
  }

  setBotCommands = () => this.bot.telegram.setMyCommands(this.commands)

  backToMain = (ctx: BotContext) => {
    const mainKeyboard = getMainKeyboard(ctx)
    return ctx.reply(ctx.translate(LanguageTextKeys.mainSelectOptions), mainKeyboard)
  }

  onStartCommand = () => {
    this.bot.start(async (ctx: BotContext) => {
      await this.dbManager.saveUser(ctx.message?.from)
      await ctx.replyWithHTML(ctx.translate(LanguageTextKeys.helloText))
      return this.backToMain(ctx)
    })
  }

  onSettings = () => {
    this.bot.hears(
      I18nClass.hearsInLocales(LanguageTextKeys.settingsBtnText),
      (ctx: BotContext) => {
        const settingsKeyboard = getSettingsKeyboard(ctx)
        return ctx.reply(ctx.translate(LanguageTextKeys.chooseSettingsText), settingsKeyboard)
      }
    )
    this.bot.hears(I18nClass.hearsInLocales(LanguageTextKeys.changeLanguageBtnText), ctx =>
      ctx.scene.enter(changeLangWizardId)
    )
  }

  onNavigateBack = () => {
    this.bot.hears(I18nClass.hearsInLocales(LanguageTextKeys.backBtnText), ctx =>
      this.backToMain(ctx)
    )
  }

  onAboutBot = () => {
    this.bot.hears(I18nClass.hearsInLocales(LanguageTextKeys.aboutBotBtnText), ctx =>
      ctx.reply(ctx.translate(LanguageTextKeys.aboutBotText))
    )
  }
}
