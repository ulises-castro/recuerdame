import { useEffect } from 'react';
import Mark from 'mark.js'

export default function App() {
  const markInstance = new Mark(document.querySelector("body"));

  useEffect(() => {
    console.log('content ui loaded');

    // FIXME: 
    // instance.mark("Not", {
    //   "element": "span",
    //   "className": "highlight"
    // });

    markInstance.unmark({
      done: () => {
        markInstance.mark("Not");
      }
    });
  }, []);

  return (
    <div className="flex gap-1 text-blue-500">
      Edit <strong>pages/content-ui/src/app.tsx</strong> and save to reload.
    </div>
  );
}
