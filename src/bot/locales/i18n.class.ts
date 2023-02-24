import { I18n } from '@grammyjs/i18n'
import { join, resolve } from 'path'

export class I18nClass {
  private static botI18N: I18n

  static textInLocales = (text: string) => {
    const locales = I18nClass.botI18N.locales
    return locales.map(locale => I18nClass.botI18N.translate(locale, text))
  }

  public static getInstance = (): I18n => {
    const isDevelopment = process.env.NODE_ENV === 'development'
    const localesDir = resolve(
      __dirname,
      `${isDevelopment ? '../' : join(process.cwd(), '/src/bot/')}locales`
    )
    if (!this.botI18N) {
      this.botI18N = new I18n({
        defaultLocale: 'en',
        useSession: true,
        directory: localesDir,
        fluentBundleOptions: {
          useIsolating: false
        }
      })
    }
    return this.botI18N
  }
}
