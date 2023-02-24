import { BaseComposer } from './base.composer'
import { message } from 'telegraf/filters'
import { BotContext } from '../../../interfaces/bot.interfaces'
import { Composer } from 'telegraf'
import { LanguageTextKeys } from '../../constants'
import { getBackKeyboard } from '../../keyboards'
import { backToMain } from '../../../utils/bot.utils'
import { Question } from '../../../database/entities/question'
import { ChatGPTClass } from '../../../chatGPT.class'

export class ChatGPTComposer extends BaseComposer {
  startAsking = (): Composer<BotContext> => {
    return this.createComposer(composer => {
      composer.on(message('text'), async ctx => {
        const backKeyboard = getBackKeyboard(ctx)
        await ctx.reply(ctx.translate(LanguageTextKeys.askQuestionText), backKeyboard)
        return ctx.wizard.next()
      })
    })
  }

  handleQuestion = (): Composer<BotContext> => {
    return this.createComposer(composer => {
      composer.on(message('text'), async ctx => {
        const { text } = ctx.message
        if (this.checkBackText(text, ctx) || this.checkStartCommand(text)) {
          await backToMain(ctx)
          return ctx.scene.leave()
        }
        const { message_id } = await ctx.reply(ctx.translate(LanguageTextKeys.pleaseWait))
        const question = new Question()
        question.text = text
        question.telegramUserId = ctx.from.id
        question.askedAt = new Date()
        const chatGptApi = await new ChatGPTClass().getApi()
        const { text: apiResponseText } = await chatGptApi.sendMessage(text, {
          timeoutMs: 2 * 60 * 1000
        })
        question.answerText = apiResponseText
        await ctx.deleteMessage(message_id)
        await ctx.reply(apiResponseText, {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: ctx.translate(LanguageTextKeys.shareText),
                  switch_inline_query: apiResponseText
                }
              ]
            ]
          }
        })
        question.answeredAt = new Date()
        await this.dbManager.saveQuestion(question)
        await ctx.reply(ctx.translate(LanguageTextKeys.moreQuestionText))
        return
      })
    })
  }
}
