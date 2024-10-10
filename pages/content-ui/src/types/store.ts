
export type HighlightCommentType = unknown

export type HighlightText = {
  range: Range;
  createdAt: Date;
  updatedAt?: Date;
}

export type HighlightCommentsMapType = Map<string, Map<string, HighlightCommentType>>

export type HighlightTextMapType = Map<string, HighlightText>;

export type HighlightsMapType = Map<string, HighlightTextMapType>

export interface UserState {
  highlightsMap: HighlightsMapType;
  highlightCommentsMap: HighlightCommentsMapType;
  savePageHighlight: (url: string, range: Range) => void
}
