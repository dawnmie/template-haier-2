// 是否是新桌面端
export const IS_NEW_DESKTOP = window.__POWERED_BY_HWORK__ || !!navigator.userAgent.match(/AppleWebKit.*Electron.*HworkLite*/)
// 是否是Mac端
export const IS_MAC = /macintosh|mac os x/i.test(navigator.userAgent.toLowerCase())
// 是否是Hwork微前端
export const IS_HWORK_QIANKUN = window.__IS_HWORK_QIANKUN__ // qiankun微前端portal标示
