import { type Component } from 'solid-js';
import { PageState } from './state/PageState';
import { ClientInformation } from './state/ClientInformationState';
import { Main } from './components/Main';

const App: Component = () => {

  return (
    <ClientInformation>
      <PageState>
        <Main />
      </PageState>
    </ClientInformation>
  );
};

export default App;
