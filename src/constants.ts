export const __DEV__ = import.meta.env.MODE === 'development'

export const BASE_URL = `https://crashmax-dev.github.io/${__PROJECT_NAME__}`
export const META_URL = `${BASE_URL}/${__PROJECT_NAME__}.meta.js`
export const USERSCRIPT_URL = `${BASE_URL}/${__PROJECT_NAME__}.user.js`
export const NOTIFY_URL = `${BASE_URL}/notify.ogg`

export const EVENT_KEYBOARD_SHORTCUTS = {
  openTasks: (event: KeyboardEvent) => event.altKey && event.key === '1',
  resetTasks: (event: KeyboardEvent) => event.altKey && event.key === '2',
  resetWidgetPosition: (event: KeyboardEvent) =>
    event.altKey && event.key === '3',
  toggleAutoSubmit: (event: KeyboardEvent) =>
    event.ctrlKey && event.code === 'KeyO',
  toggleWidgetVisibility: (event: KeyboardEvent) =>
    event.ctrlKey && event.code === 'KeyX',
  clickSubmit: (event: KeyboardEvent) => event.ctrlKey && event.code === 'KeyM'
} as const

export const EVENT_KEYBOARD_SHORTCUTS_HELP = `
Alt + 1 - Открыть список задач
Alt + 2 - Сбросить данные        
Alt + 3 - Сбросить позицию виджета                           
Ctrl + O - Включить/выключить автоподтверждение              
Ctrl + X - Скрыть/показать виджет
`
