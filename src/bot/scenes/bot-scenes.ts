import { Scenes, Telegraf } from 'telegraf'
import { DatabaseManager } from '../../database/database-manager'
import { BotContext } from '../../interfaces/bot.interfaces'
import { ChangeLangComposer } from './composers/change-lang.composer'
import { changeLangWizardId, chatGPTWizardId } from '../constants'
import { ChatGPTComposer } from './composers/chatGPT.composer'

export class BotScenes {
  stage: Scenes.Stage<BotContext>
  changeLangComposer: ChangeLangComposer
  chatGPTComposer: ChatGPTComposer
  constructor(
    private readonly bot: Telegraf<BotContext>,
    private readonly dbManger: DatabaseManager
  ) {
    this.changeLangComposer = new ChangeLangComposer(dbManger)
    this.chatGPTComposer = new ChatGPTComposer(dbManger)
  }

  init = () => {
    this.stage = new Scenes.Stage<BotContext>([this.changeLangScene(), this.chatGPTScene()])
    this.bot.use(this.stage.middleware())
  }

  changeLangScene = (): Scenes.WizardScene<BotContext> => {
    return new Scenes.WizardScene<BotContext>(
      changeLangWizardId,
      this.changeLangComposer.startSettings(),
      this.changeLangComposer.switchLang()
    )
  }

  chatGPTScene = (): Scenes.WizardScene<BotContext> => {
    return new Scenes.WizardScene<BotContext>(
      chatGPTWizardId,
      this.chatGPTComposer.startAsking(),
      this.chatGPTComposer.handleQuestion()
    )
  }
}
