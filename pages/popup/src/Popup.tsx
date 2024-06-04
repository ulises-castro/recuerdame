import '@src/Popup.css';
import {
  withErrorBoundary,
  withSuspense,
} from '@chrome-extension-boilerplate/shared';

const Popup = () => {
  return (
    <div
      className="App"
    >
      <header className="App-header">
        <h1>Recuerdito</h1>
      </header>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
