import { useEffect } from 'react';

import '@src/style.css';

const highlights = CSS.highlights

export default function App() {

export default function App() {
  const handleSelectionChange = async () => {
    const selection = window.getSelection();
    const selectedText = selection?.toString().trim()

    console.log({ selection }, selectedText)
    if (selectedText) {
      const range = selection?.getRangeAt(0)
      console.log(range);
      const commonAncestor = range.commonAncestorContainer;

      console.log(range)
      const highlight = new Highlight()
      highlight.add(range)

      highlights.set('recuerdito-highlight', highlight)

      // console.table(highlights.values().toArray())
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
