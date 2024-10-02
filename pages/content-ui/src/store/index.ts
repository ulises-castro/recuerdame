import { create } from 'zustand'
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware'
import createSelectors from './createSelectors'

import { nanoid } from 'nanoid'

import { PageHighlight, UserState } from '@src/types/store'

const createPageHighlight = (range: Range) => {
  const highlights = new Map()
  highlights.set(nanoid(), {
    comments: null,
    range,
    createdAt: new Date(),
    updatedAt: new Date()
  })

  return highlights
}

const extensionStorage: StateStorage = {
  getItem: async (name) =>
    new Promise((resolve) => {
      chrome.storage.local.get([name], (result) => {
        resolve(result[name])
      })
    }),
  setItem: async (name, value) => chrome.storage.local.set({ [name]: value }),
  removeItem: async (name) => chrome.storage.local.remove(name),
}

const userStoreBase = create<UserState>(persist(
  (set, get) => ({
    highlights: new Map() as PageHighlight,
    savePageHighlight: (url: string, range: Range) => set((state) => {
      const updatedHighlights = new Map(state.highlights)
      const newHighlight = createPageHighlight(range)
      const pageHighligts = new Map(updatedHighlights.get(url) ?? new Map([[nanoid(), newHighlight]]))

      updatedHighlights.set(url, pageHighligts)


      // if (pageHighligts) {
      //   const updatedUrlMap = new Map(pageHighligts)
      //   updatedUrlMap.set(nanoid(), newHighlight)
      // } else {
      //
      //   // updatedHighlights.set(url, new Map([[nanoid(), newHighlight]]))
      // }

      // pageHighligts.set()


      return { highlights: updatedHighlights }
    })
  }),
  {
    name: 'highlighted-date-store',
    storage: createJSONStorage(() => extensionStorage)
  }
))

export const useUserStore = createSelectors(userStoreBase)

