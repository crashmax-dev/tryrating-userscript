declare module 'userscript-parser' {
  export interface Metadata {
    content: string
    metablock: string
    meta: {
      name: string[]
      version: string[]
    }
  }

  export default function parseMetadata(value: string): Metadata | null
}
