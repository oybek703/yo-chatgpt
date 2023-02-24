import { DatabaseManager } from '../database/database-manager'
import { I18n } from '@grammyjs/i18n'
import { changeLangWizardId, chatGPTWizardId, LanguageTextKeys } from './constants'
import { I18nClass } from './locales/i18n.class'
import { BotContext } from '../interfaces/bot.interfaces'
import { BotCommand } from 'telegraf/typings/core/types/typegram'
import { session, Telegraf } from 'telegraf'
import { BotScenes } from './scenes/bot-scenes'
import { backToMain, chooseSettings } from '../utils/bot.utils'
import { formatUserStartedBot } from '../utils'

export class Handlers {
  scenes: BotScenes
  private readonly dbManager: DatabaseManager
  private readonly i18n: I18n
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
    this.bot.use(this.i18n as any)
    this.onStartCommand()
    this.onAskQuestion()
    this.onSettings()
    this.onNavigateBack()
    this.onAboutBot()
    await this.bot.launch()
  }

  setBotCommands = () => this.bot.telegram.setMyCommands(this.commands)

  onStartCommand = () => {
    this.bot.start(async (ctx: BotContext) => {
      const newUser = await this.dbManager.saveUser(ctx.message?.from)
      // Send about new joined user to the group
      if (newUser) {
        const usersCount = await this.dbManager.getUsersCount()
        const infoText = formatUserStartedBot(newUser, usersCount)
        await ctx.telegram.sendMessage(`-100${process.env.GROUP_ID}`, infoText, {
          parse_mode: 'HTML'
        })
      }
      await ctx.replyWithHTML(ctx.translate(LanguageTextKeys.helloText))
      return backToMain(ctx)
    })
  }

  onAskQuestion = () => {
    this.bot.hears(I18nClass.textInLocales(LanguageTextKeys.startChatBtnText), ctx =>
      ctx.scene.enter(chatGPTWizardId)
    )
  }

  onSettings = () => {
    this.bot.hears(I18nClass.textInLocales(LanguageTextKeys.settingsBtnText), chooseSettings)
    this.bot.hears(I18nClass.textInLocales(LanguageTextKeys.changeLanguageBtnText), ctx =>
      ctx.scene.enter(changeLangWizardId)
    )
  }

  onNavigateBack = () => {
    this.bot.hears(I18nClass.textInLocales(LanguageTextKeys.backBtnText), backToMain)
  }

  onAboutBot = () => {
    this.bot.hears(I18nClass.textInLocales(LanguageTextKeys.aboutBotBtnText), ctx =>
      ctx.replyWithHTML(ctx.translate(LanguageTextKeys.aboutBotText))
    )
  }
}
