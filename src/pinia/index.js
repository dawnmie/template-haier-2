import { createPinia } from 'pinia'

const pinia = createPinia()

export default pinia

export { default as userStore } from './modules/user'
