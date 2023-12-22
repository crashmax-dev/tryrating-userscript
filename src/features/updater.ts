import { createSignal } from 'solid-js'
import parseMetadata from 'userscript-parser'
import type { Metadata } from 'userscript-parser'

import { META_URL, USERSCRIPT_URL } from '../constants.js'
import { logger } from '../utils/logger.js'

const [isUpdated, setIsUpdated] = createSignal(false)

class Updater {
  get currentVersion() {
    return GM_info.script.version
  }

  checkUpdates(): void {
    if (isUpdated()) return

    logger.info('Check updates...')

    GM_xmlhttpRequest({
      url: META_URL,
      onload: ({ response }) => {
        const metadata = parseMetadata(response)
        if (!metadata) {
          logger.error('Failed to parse metadata')
          return
        }

        this.checkMetadata(metadata.meta)
      },
      onerror: (error) => {
        logger.error(error)
      }
    })
  }

  private checkMetadata(metadata: Metadata['meta']): void {
    if (metadata.version[0] === this.currentVersion) return
    logger.info('Founded new version', metadata.version)

    const isConfirmUpdate = confirm(
      `Найдена новая версия ${metadata.version}.\nЖелаете обновить?`
    )
    if (!isConfirmUpdate) {
      setIsUpdated(true)
      return
    }

    GM_openInTab(USERSCRIPT_URL, { active: true }).onclose = () => {
      location.reload()
    }
  }
}

export const updater = new Updater()
