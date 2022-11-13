export type ClassificationData = Record<string, Classification>

export interface ClassificationRecord {
  key: string
  path?: string
  pages: any[]
  children?: Classification
}

export type Classification = Record<string, ClassificationRecord>
