import { Scenes, Telegraf } from 'telegraf'
import { DatabaseManager } from '../../database/database-manager'
import { BotContext } from '../../interfaces/bot.interfaces'
import { ChangeLangComposer } from './composers/change-lang.composer'
import { changeLangWizardId, LanguageTextKeys } from '../constants'

export class ScenesBase {
  stage: Scenes.Stage<Scenes.SceneContext>
  changeLangComposer: ChangeLangComposer
  constructor(
    private readonly bot: Telegraf<BotContext>,
    private readonly dbManger: DatabaseManager
  ) {
    this.changeLangComposer = new ChangeLangComposer(dbManger)
  }

  init = async () => {
    this.stage = new Scenes.Stage([this.changeLangScene() as any])
    this.bot.use(this.stage.middleware())
  }

  changeLangScene = (): Scenes.WizardScene<BotContext> => {
    return new Scenes.WizardScene<BotContext>(
      changeLangWizardId,
      this.changeLangComposer.startSettings()
    ).command(`/${LanguageTextKeys.startCommand}`, ctx => ctx.scene.leave())
  }
}
