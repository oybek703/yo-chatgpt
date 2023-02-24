import { BaseComposer } from './base.composer'
import { message } from 'telegraf/filters'
import { BotContext } from '../../../interfaces/bot.interfaces'
import { Composer } from 'telegraf'
import { LanguageTextKeys } from '../../constants'
import { getLanguagesKeyboard } from '../../keyboards'
import { I18nClass } from '../../locales/i18n.class'
import { backToMain } from '../../../utils/bot.utils'

export class ChangeLangComposer extends BaseComposer {
  showLanguagesKeyboard = async (ctx: BotContext) => {
    const languagesKeyboard = getLanguagesKeyboard(ctx)
    await ctx.reply(ctx.translate(LanguageTextKeys.chooseLanguageText), languagesKeyboard)
  }

  startSettings = (): Composer<BotContext> => {
    return this.createComposer(composer => {
      composer.use(I18nClass.getInstance())
      composer.on(message('text'), async ctx => {
        await this.showLanguagesKeyboard(ctx)
        return ctx.wizard.next()
      })
    })
  }

  switchLang = (): Composer<BotContext> => {
    return this.createComposer(composer => {
      composer.use(I18nClass.getInstance())
      composer.on(message('text'), async ctx => {
        const { text } = ctx.message
        if (text === ctx.translate(LanguageTextKeys.backBtnText)) {
          await this.showLanguagesKeyboard(ctx)
          return
        }
        const ruText = ctx.translate(LanguageTextKeys.ruLangBtnText)
        const enText = ctx.translate(LanguageTextKeys.enLangBtnText)
        const existingLanguages = [ruText, enText]
        if (existingLanguages.includes(text)) {
          let newLang = await ctx.i18n.getLocale()
          switch (text) {
            case ruText:
              newLang = 'ru'
              break
            case enText:
              newLang = 'en'
              break
          }
          await ctx.i18n.setLocale(newLang)
          await backToMain(ctx)
          return ctx.scene.leave()
        }
        return ctx.reply(ctx.translate(LanguageTextKeys.invalidLangWarn))
      })
    })
  }
}
