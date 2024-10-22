import '@src/style.css';

import HighlighterController from './components/highlight/HighlighterController';
import HighlightToobar from './components/HighlightToobar';


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
  return (
    <div className="flex gap-1 text-blue-500 h-20">
      <HighlighterController />
      <HighlightToobar />
    </div>
  );
}

