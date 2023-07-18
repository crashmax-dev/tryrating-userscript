export const __DEV__ = import.meta.env.MODE === 'development'

export const BASE_URL = `https://crashmax-dev.github.io/${__PROJECT_NAME__}`
export const META_URL = `${BASE_URL}/${__PROJECT_NAME__}.meta.js`
export const USERSCRIPT_URL = `${BASE_URL}/${__PROJECT_NAME__}.user.js`
export const NOTIFY_URL = `${BASE_URL}/${__PROJECT_NAME__}/notify.ogg`
