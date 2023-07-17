import { defineConfig } from 'vite'
import Solidjs from 'vite-plugin-solid'
import Userscript from 'vite-userscript-plugin'
import { author, license, name, version } from './package.json'

export default defineConfig((config) => {
  const match = ['https://www.tryrating.com/app/survey/*']

  if (config.mode === 'development') {
    match.push('https://www.tryrating.com/login?*')
  }

  return {
    define: {
      __PROJECT_NAME__: JSON.stringify(name)
    },
    plugins: [
      Solidjs(),
      Userscript({
        entry: 'src/index.tsx',
        header: {
          name,
          version,
          author,
          license,
          match,
          connect: 'github.io'
        },
        server: {
          port: 3000
        }
      })
    ]
  }
})
