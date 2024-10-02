
export type CommentType = {
  uuid: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export type HighlightedText = {
  // uuid: string;
  range: Range;
  // used uuid instead to avoid nested updating
  comments: string[] | null;
  createdAt: Date;
  updatedAt: Date;
}

export type PageHighlight = Map<string, Map<string, HighlightedText>>

export interface UserState {
  // savedHighlights: null;
  highlights: PageHighlight;
  savePageHighlight: (url: string, range: Range) => void
  // addHighlightedText: (url: string, range: Range) => void
}
