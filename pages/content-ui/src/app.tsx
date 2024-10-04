// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { useEffect } from 'react';

import '@src/style.css';
import { useUserStore } from './store';
const highlights = CSS.highlights

function AddHiglight({ url, range }: { url: string, range: Range }) {
  const { addHighlightedText, savedHighlights } = useUserStore.use;  // Access the state and actions
  const createHighlightedText = addHighlightedText();
  const totalSavedHighlight = savedHighlights()?.length

  return (
    <div>
      <p>Count: {totalSavedHighlight}</p>
      <button onClick={() => createHighlightedText(url, range)}>Add highlight</button>
    </div>
  );
};

export default function App() {
  const { savePageHighlight, highlights } = useUserStore.use;  // Access the state and actions
  const pageHighlights = highlights()
  const saveHighlight = savePageHighlight()
  const domain = window.location.origin;  // Returns the domain, e.g., "https://www.example.com"
  const path = window.location.pathname;  // Returns the path, e.g., "/path/to/resource"
  const pageUrl = domain + path;
  const handleSelectionChange = async () => {
    const selection = window.getSelection();
    const selectedText = selection?.toString().trim()

    console.log({ selection }, selectedText)
    if (selection && selectedText) {
      const range = selection?.getRangeAt(0)
      console.log(range);
      // const commonAncestor = range.commonAncestorContainer;

    }
  }

  useEffect(() => {
    console.log('content ui loaded');

    document.addEventListener('mouseup', handleSelectionChange)
    document.addEventListener('keyup', handleSelectionChange)
    return () => {
      document.removeEventListener('mouseup', handleSelectionChange)
      document.removeEventListener('keyup', handleSelectionChange)
    }

  }, []);

  useEffect(() => {
    if (!pageHighlights?.get(pageUrl)) return


    console.log(pageHighlights.values())

    const highlightsRanges = [pageHighlights.get(pageUrl).values()]


    // const highlight = new Highlight(pageHighlights)
    //
    // CSS.highlights.set('recuerdame-highlight', highlight)
  }, [pageHighlights])

  return (
    <div className="flex gap-1 text-blue-500 h-20">
      {/* <AddHiglight url={pageUrl} range={} /> */}
      Edit <strong>pages/content-ui/src/app.tsx</strong> and save to reload.
    </div>
  );
}

