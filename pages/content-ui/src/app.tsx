import { useEffect } from 'react';

import '@src/style.css';

const highlights = CSS.highlights

export default function App() {

  const handleSelectionChange = async () => {
    const selection = window.getSelection();

    console.log(selection)
    if (selection && selection.rangeCount > 0) {
      const range = selection?.getRangeAt(0)
      console.log(range);
      const commonAncestor = range.commonAncestorContainer;

      if (commonAncestor.nodeType !== Node.ELEMENT_NODE) {
        // commonAncestor = commonAncestor.parentElement;
      }


      const highlight = new Highlight(range)

      highlights.set('copilot-highlight', highlight)

      console.log('hi')

      console.table(highlights.values().toArray())
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
    <div className="flex gap-1 text-blue-500">
      Edit <strong>pages/content-ui/src/app.tsx</strong> and save to reload.
    </div>
  );
}
