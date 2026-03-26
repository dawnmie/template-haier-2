import { createI18n } from 'vue-i18n'

const messages = {}

const createI18nInstance = () => createI18n({
  legacy: false, // 使用 Composition API 模式，则需要将其设置为false
  fallbackLocale: 'zh-CN',
  globalInjection: true,
  locale: 'zh-CN',
  warnHtmlInMessage: false,
  silentTranslationWarn: true,
  missingWarn: false,
  fallbackWarn: false,
  messages: {}
})

export {
  createI18nInstance
}
