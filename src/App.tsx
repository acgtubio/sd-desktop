import { createResource, type Component } from 'solid-js';
import { invoke } from '@tauri-apps/api';
import { Suspense } from 'solid-js';
import { Dashboard } from './components/Dashboard';

const App: Component = () => {
  const [name] = createResource(async () => {
    return invoke("greet", { name: "User" });
  })
  return (
    <div class='w-full'>
      <section>
        <Suspense fallback={<div> Loading Name... </div>}>
          <div>
            {name()}
          </div>
        </Suspense>
      </section>
      <Dashboard />
    </div>
  );
};

export default App;
