import { BotContext } from '../interfaces/bot.interfaces'
import { Markup } from 'telegraf'
import { LanguageTextKeys } from './constants'

export const getMainKeyboard = (ctx: BotContext) =>
  Markup.keyboard([
    [ctx.translate(LanguageTextKeys.startChatBtnText)],
    [
      ctx.translate(LanguageTextKeys.aboutBotBtnText),
      ctx.translate(LanguageTextKeys.settingsBtnText)
    ]
  ]).resize()

export const getSettingsKeyboard = (ctx: BotContext) =>
  Markup.keyboard([
    [ctx.translate(LanguageTextKeys.changeLanguageBtnText)],
    [ctx.translate(LanguageTextKeys.backBtnText)]
  ]).resize()

export const getLanguagesKeyboard = (ctx: BotContext) =>
  Markup.keyboard([
    [ctx.translate(LanguageTextKeys.enLangBtnText), ctx.translate(LanguageTextKeys.ruLangBtnText)],
    [ctx.translate(LanguageTextKeys.backBtnText)]
  ]).resize()

export const getBackKeyboard = (ctx: BotContext) =>
  Markup.keyboard([[ctx.translate(LanguageTextKeys.backBtnText)]]).resize()

// export const getShareKeyboard = (ctx: BotContext) =>
//   Markup.inlineKeyboard([{ text: ctx.translate(LanguageTextKeys.shareText), switch_inline_query: '' }]).resize()
