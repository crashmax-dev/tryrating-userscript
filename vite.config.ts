import { defineConfig } from 'vite'
import Solidjs from 'vite-plugin-solid'
import Userscript from 'vite-userscript-plugin'
import { author, homepage, license, name, version } from './package.json'

export default defineConfig((config) => {
  const match = ['https://www.tryrating.com/app/survey/*']

  if (config.mode === 'development') {
    match.push('https://www.tryrating.com/login?*')
  }

  return {
    plugins: [
      Solidjs(),
      Userscript({
        entry: 'src/index.tsx',
        header: {
          name,
          version,
          author,
          license,
          homepage,
          match
        },
        server: {
          port: 3000
        }
      })
    ]
  }
})
