
export type Comment = {
  uuid: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export type HighlightedText = {
  uuid: string;
  range: Range;
  comments: Comment[] | null;
  createdAt: Date;
  updatedAt: Date;
}

export type PageHighlight = {
  uuid: string;
  url: string;
  highlights: HighlightedText[];
}

export interface UserState {
  savedHighlights: PageHighlight[] | null;
  addHighlightedText: (url: string, range: Range) => void
}
