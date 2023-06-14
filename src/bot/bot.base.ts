import 'colors'
import { Telegraf } from 'telegraf'
import { BotContext } from '../interfaces/bot.interfaces'
import { LanguageTextKeys } from './constants'

export class BotBase {
  private readonly token: string
  bot: Telegraf<BotContext>

  constructor() {
    this.token = process.env.BOT_TOKEN || ''
  }

  async start() {
    try {
      this.bot = new Telegraf<BotContext>(this.token)
      this.bot.catch(async (err, ctx) => {
        if (err instanceof Error) console.log(`${err.message.red.underline.bold} \n ${err.stack}`)
        await ctx.reply(ctx.translate(LanguageTextKeys.temporaryUnavailable))
      })
      console.log(`Bot started successfully!`.yellow.underline.bold)
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(`Error while launching bot: ${e.message}`.red.underline.bold)
      }
    }
  }
}
