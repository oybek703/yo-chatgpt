import { Context } from 'telegraf'
import { I18nFlavor } from '@grammyjs/i18n'
import {
  SceneContext,
  SceneContextScene,
  SceneSessionData,
  WizardContextWizard,
  WizardSessionData
} from 'telegraf/typings/scenes'

export type BotContext = Context & {
  scene: SceneContextScene<any, WizardSessionData>
  wizard: WizardContextWizard<any>
} & SceneContext<SceneSessionData> &
  I18nFlavor
