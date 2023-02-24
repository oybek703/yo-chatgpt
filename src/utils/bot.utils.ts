import { BotContext } from '../interfaces/bot.interfaces'
import { getMainKeyboard } from '../bot/keyboards'
import { LanguageTextKeys } from '../bot/constants'

export const backToMain = async (ctx: BotContext) => {
  const mainKeyboard = getMainKeyboard(ctx)
  return ctx.reply(ctx.translate(LanguageTextKeys.mainSelectOptions), mainKeyboard)
}
