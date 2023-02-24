import { Context, Scenes } from 'telegraf'
import { I18nFlavor } from '@grammyjs/i18n'
import { SceneContextScene, WizardContextWizard, WizardSessionData } from 'telegraf/typings/scenes'

export type BotContext = Context & {
  scene: SceneContextScene<any, WizardSessionData>
  wizard: WizardContextWizard<any>
} & Scenes.SceneContext &
  I18nFlavor
