import { create, StoreApi, UseBoundStore } from 'zustand'
import { nanoid } from 'nanoid'

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S,
) => {
  const store = _store as WithSelectors<typeof _store>
  store.use = {}
  for (const k of Object.keys(store.getState())) {
    ; (store.use as any)[k] = () => store((s) => s[k as keyof typeof s])
  }

  return store
}

type Comment = {
  uuid: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

type HighlightedText = {
  uuid: string;
  range: Range;
  comments: Comment[] | null;
  createdAt: Date;
  updatedAt: Date;
}

type PageHighlight = {
  uuid: string;
  url: string;
  highlights: HighlightedText[];
}

const createPageHighlight = (url: string, range: Range): PageHighlight => {
  return {
    uuid: nanoid(),
    url,
    highlights: [{
      uuid: nanoid(),
      comments: null,
      range,
      createdAt: new Date(),
      updatedAt: new Date()
    }]
  }
}

interface UserState {
  savedHighlights: PageHighlight[] | null;
  counter: number;
  addHighlightedText: (url: string, range: Range) => void
}

const userStoreBase = create<UserState>((set) => ({
  counter: 0,
  savedHighlights: null,
  addHighlightedText: (url, range) =>
    set((state) => {
      const updatedHighlights = [...state.savedHighlights ?? []]
      updatedHighlights.push(createPageHighlight(url, range))

      return { savedHighlights: updatedHighlights }
    }),
}))

export const useUserStore = createSelectors(userStoreBase)

