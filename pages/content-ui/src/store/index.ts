import { create } from 'zustand'
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware'
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
  (set) => ({
    savedHighlights: null,
    addHighlightedText: (url, range) =>
      set((state) => {
        const updatedHighlights = [...state.savedHighlights ?? []]
        updatedHighlights.push(createPageHighlight(url, range))

        return { savedHighlights: updatedHighlights }
      })
  }),
  {
    name: 'highlighted-date-store',
    storage: createJSONStorage(() => extensionStorage)
  }
))

export const useUserStore = createSelectors(userStoreBase)

