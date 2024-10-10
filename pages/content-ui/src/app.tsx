// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { useCallback, useEffect } from 'react';

import '@src/style.css';
import { useUserStore } from './store';

import superjson from 'superjson';

// Function to get the path to a given node relative to the document root.
function getNodePath(node) {
  const path = [];
  while (node) {
    const index = Array.prototype.indexOf.call(node.parentNode?.childNodes || [], node);
    if (index !== -1) {
      path.unshift(index);
    }
    node = node.parentNode;
  }
  return path;
}

// Function to get a node from the document root using a path.
function getNodeFromPath(path) {
  let node = document;
  for (const index of path) {
    node = node.childNodes[index];
  }
  return node;
}

// Register custom serialization for Range.
superjson.registerCustom(
  {
    isApplicable: (value) => value instanceof Range,
    serialize: (range) => {
      return {
        startPath: getNodePath(range.startContainer),
        startOffset: range.startOffset,
        endPath: getNodePath(range.endContainer),
        endOffset: range.endOffset,
      };
    },
    deserialize: (value) => {
      const startContainer = getNodeFromPath(value.startPath);
      const endContainer = getNodeFromPath(value.endPath);
      const range = document.createRange();
      range.setStart(startContainer, value.startOffset);
      range.setEnd(endContainer, value.endOffset);
      return range;
    },
  },
  'Range'
);

// Usage example
const range = document.createRange();
range.setStart(document.body, 0);
range.setEnd(document.body, 1);

const serialized = superjson.stringify(range);
console.log(serialized);

// const deserialized = superjson.parse(serialized);
// console.log(deserialized);
//
// const highlights = CSS.highlights

// function AddHiglight({ url, range }: { url: string, range: Range }) {
//   const { savePageHighlight, highlights } = useUserStore.use;  // Access the state and actions
//   const createHighlightedText = addPageHighlight();
//   const totalSavedHighlight = highlights()?.size
//
//   return (
//     <div>
//       <p>Count: {totalSavedHighlight}</p>
//       <button onClick={() => createHighlightedText(url, range)}>Add highlight</button>
//     </div>
//   );
// };

export default function App() {
  const { savePageHighlight, highlightsMap } = useUserStore.use;  // Access the state and actions
  const _pageHighlights = highlightsMap()
  const saveHighlight = savePageHighlight()
  const domain = window.location.origin;  // Returns the domain, e.g., "https://www.example.com"
  const path = window.location.pathname;  // Returns the path, e.g., "/path/to/resource"
  const pageUrl = domain + path;

  const handleSelectionChange = useCallback(async () => {
    const selection = window.getSelection();
    const selectedText = selection?.toString().trim()

    console.log({ selection }, selectedText)
    if (selection && selectedText) {
      const range = selection?.getRangeAt(0)
      console.log(range);
      // const commonAncestor = range.commonAncestorContainer;

      saveHighlight(pageUrl, range)
    }
  }, [pageUrl, saveHighlight])

  useEffect(() => {
    console.log('content ui loaded');

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
  }, [_pageHighlights])

  return (
    <div className="flex gap-1 text-blue-500 h-20">
      {/* <AddHiglight url={pageUrl} range={} /> */}
      Edit <strong>pages/content-ui/src/app.tsx</strong> and save to reload.
    </div>
  );
}

