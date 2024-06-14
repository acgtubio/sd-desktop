import { createResource, type Component } from 'solid-js';
import { invoke } from '@tauri-apps/api';
import { Suspense } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';

const App: Component = () => {
  const [name] = createResource(async () => {
    return invoke("greet", { name: "Adrian" });
  })
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          class={styles.link}
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
      </header>
      <section>
        <Suspense fallback={<div> Loading Name... </div>}>
          <div>
            {name()}
          </div>
        </Suspense>
      </section>
    </div>
  );
};

export default App;
