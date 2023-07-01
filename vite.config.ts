import { defineConfig } from 'vite'
import Solidjs from 'vite-plugin-solid'
import Userscript from 'vite-userscript-plugin'
import { author, homepage, license, name, version } from './package.json'

export default defineConfig((config) => {
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
          match: 'https://www.tryrating.com/app/survey/*'
        },
        server: {
          port: 3000
        }
      })
    ]
  }
})
