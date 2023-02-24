import { BaseComposer } from './base.composer'
import { message } from 'telegraf/filters'
import { BotContext } from '../../../interfaces/bot.interfaces'
import { Composer } from 'telegraf'

export class ChangeLangComposer extends BaseComposer {
  startSettings = (): Composer<BotContext> => {
    return this.createComposer(composer => {
      composer.on(message('text'), async ctx => {
        const { text } = ctx.message
        console.log('This is from composer => ', text)
      })
    })
  }
}
