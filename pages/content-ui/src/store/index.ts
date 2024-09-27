import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import createSelectors from './createSelectors'

import { nanoid } from 'nanoid'

import { PageHighlight, UserState } from '@src/types/store'

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

const userStoreBase = create<UserState>((set) => ({
  savedHighlights: null,
  addHighlightedText: (url, range) =>
    set((state) => {
      const updatedHighlights = [...state.savedHighlights ?? []]
      updatedHighlights.push(createPageHighlight(url, range))

      return { savedHighlights: updatedHighlights }
    }),
}))

// const userStoreBase = create<UserState>(persist(
//   (set) => ({
//     savedHighlights: null,
//     addHighlightedText: (url, range) =>
//       set((state) => {
//         const updatedHighlights = [...state.savedHighlights ?? []]
//         updatedHighlights.push(createPageHighlight(url, range))
//
//         return { savedHighlights: updatedHighlights }
//       })
//   }),
//   {
//     name: 'highlighted-store',
//   }
// ))

export const useUserStore = createSelectors(userStoreBase)

