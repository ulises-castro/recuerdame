// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { useCallback, useEffect } from 'react';
import { useUserStore } from '@/store';
import { EXTENSION_VIEW_ROOT_ID } from '@src/utils/constants';


// TODO: Make it a hook instead
export default function HighlighterController() {
  const { savePageHighlight, highlightsMap } = useUserStore.use  // Access the state and actions
  const _pageHighlights = highlightsMap()
  const saveHighlight = savePageHighlight()
  const domain = window.location.origin
  const path = window.location.pathname
  const pageUrl = domain + path;

  const handleSelectionChange = useCallback(async (event: MouseEvent | KeyboardEvent) => {
    if ((event.target as HTMLElement)?.id === EXTENSION_VIEW_ROOT_ID) return

    const selection = window.getSelection();
    const selectedText = selection?.toString().trim()

    console.log({ selection }, selectedText)
    if (selection && selectedText) {
      const range = selection?.getRangeAt(0)
      console.log(range);

      console.log(pageUrl, range)
      saveHighlight(pageUrl, range)
    }
  }, [pageUrl, saveHighlight])

  useEffect(() => {
    document.addEventListener('mouseup', handleSelectionChange)
    document.addEventListener('keyup', handleSelectionChange)
    return () => {
      document.removeEventListener('mouseup', handleSelectionChange)
      document.removeEventListener('keyup', handleSelectionChange)
    }

  }, [handleSelectionChange]);

  useEffect(() => {
    const highlightsUrl = _pageHighlights?.get(pageUrl)
    if (!highlightsUrl) return

    const ranges: Range[] = [];
    for (const [uuid, highlightsMap_] of highlightsUrl) {
      console.log(uuid, highlightsMap_)
      ranges.push(highlightsMap_.range as Range)
    }

    if (!ranges.length) return

    const highlight = new Highlight(...ranges)
    CSS.highlights.set('recuerdame-highlight', highlight)
  }, [_pageHighlights, pageUrl])

  return <></>
}
