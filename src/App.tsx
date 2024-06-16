import { createResource, type Component } from 'solid-js';
import { invoke } from '@tauri-apps/api';
import { Suspense } from 'solid-js';
import { Dashboard } from './components/Dashboard';

const App: Component = () => {
  return (
    <main class='w-full'>
      <Dashboard />
    </main>
  );
};

export default App;
