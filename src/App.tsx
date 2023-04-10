import './App.css';
// import { Form } from './form/form';
import { GitHubSearchPage } from './components/github-search-page/github-search-page';
import { ErrorBoundary } from './components';

function App() {
  return (
    <ErrorBoundary>
      <GitHubSearchPage />
    </ErrorBoundary>
  );
}

export default App;
