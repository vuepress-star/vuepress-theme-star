export type ClassificationData = Record<string, Classification>

export type Classification = Record<
  string,
  { key: string; pages: any[]; children?: Classification }
>
