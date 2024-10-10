import { stringify, parse } from 'superjson'
import { create } from 'zustand'
import { persist, StateStorage } from 'zustand/middleware'
import createSelectors from './createSelectors'

import { nanoid } from 'nanoid'

import { HighlightCommentsMapType, HighlightText, HighlightTextMapType, HighlightsMapType, UserState } from '@src/types/store'

const createPageHighlight = (range: Range): HighlightText => {
  return {
    range,
    createdAt: new Date(),
  }
}

const initialState = {
  highlightsMap: new Map() as HighlightsMapType,
  highlightCommentsMap: new Map() as HighlightCommentsMapType
}

const storage: StateStorage = {
  getItem: async (name) =>
    new Promise((resolve) => {
      chrome.storage.local.get([name], (result) => {
        if (!result[name]) return resolve(null)
        resolve(parse(result[name]))
      })
    }),
  setItem: async (name, value) => {
    console.log(name, value)
    const parsedValue = stringify(value)
    await chrome.storage.local.set({ [name]: parsedValue },)
  },
  removeItem: async (name) => chrome.storage.local.remove(name),
}

const userStoreBase = create<UserState>(persist(
  (set, get) => ({
    ...initialState,
    savePageHighlight: (url: string, range: Range) => {
      const highlightsMap = get().highlightsMap
      const updatedHighlights = new Map(highlightsMap)
      const newHighlight = createPageHighlight(range)
      const pageHighligts = updatedHighlights.get(url) ?? new Map() as HighlightTextMapType

      pageHighligts.set(nanoid(), newHighlight)
      updatedHighlights.set(url, pageHighligts)


      // if (pageHighligts) {
      //   const updatedUrlMap = new Map(pageHighligts)
      //   updatedUrlMap.set(nanoid(), newHighlight)
      // } else {
      //
      //   // updatedHighlights.set(url, new Map([[nanoid(), newHighlight]]))
      // }

      set((state) => ({
        highlightsMap: updatedHighlights
      }))
    }
  }),
  {
    name: 'highlighted-date-store',
    storage
  }
))

export const useUserStore = createSelectors(userStoreBase)

