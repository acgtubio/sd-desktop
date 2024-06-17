import { type Component } from 'solid-js';
import { PageState } from './state/PageState';
import { Main } from './components/Main';

const App: Component = () => {

  return (
    <PageState>
      <Main />
    </PageState>
  );
};

export default App;
