import { BotContext } from '../interfaces/bot.interfaces'
import { getMainKeyboard, getSettingsKeyboard } from '../bot/keyboards'
import { LanguageTextKeys } from '../bot/constants'

export const backToMain = async (ctx: BotContext) => {
  const mainKeyboard = getMainKeyboard(ctx)
  return ctx.reply(ctx.translate(LanguageTextKeys.mainSelectOptions), mainKeyboard)
}

export const chooseSettings = async (ctx: BotContext) => {
  const settingsKeyboard = getSettingsKeyboard(ctx)
  return ctx.reply(ctx.translate(LanguageTextKeys.chooseSettingsText), settingsKeyboard)
}
