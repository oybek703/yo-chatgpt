import { BotContext } from '../interfaces/bot.interfaces'
import { Markup } from 'telegraf'
import { LanguageTextKeys } from './constants'

export const getMainKeyboard = (ctx: BotContext) =>
  Markup.keyboard([
    [ctx.translate(LanguageTextKeys.changeLanguageBtnText)],
    [
      ctx.translate(LanguageTextKeys.aboutBotBtnText),
      ctx.translate(LanguageTextKeys.settingsBtnText)
    ]
  ]).resize()
