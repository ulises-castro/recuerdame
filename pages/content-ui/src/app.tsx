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
  const handleSelectionChange = async () => {
    const selection = window.getSelection();
    const selectedText = selection?.toString().trim()

    console.log({ selection }, selectedText)
    if (selectedText) {
      const range = selection?.getRangeAt(0)
      console.log(range);
      // const commonAncestor = range.commonAncestorContainer;

      console.log(range)
      const highlight = new Highlight()
      highlight.add(range)

      highlights.set('recuerdame-highlight', highlight)
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

  return (
    <div className="flex gap-1 text-blue-500 h-20">
      <AddHiglight />
      Edit <strong>pages/content-ui/src/app.tsx</strong> and save to reload.
    </div>
  );
}

