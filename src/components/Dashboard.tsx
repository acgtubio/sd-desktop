import { Component, For, createEffect } from "solid-js";
import { invoke } from '@tauri-apps/api';
import { createResource } from "solid-js";
import { Suspense } from "solid-js";

export const Dashboard: Component = (props) => {
  const [headers] = createResource(async () => {
    return invoke("get_headers");
  });

  createEffect(() => {
    console.log(headers());
  });

  return (
    <table class="w-full border">
      <thead>
        <tr>
          <Suspense fallback="Fetching Headers">
            <For each={headers()}>{(header, i) =>
              <th>
                {header}
              </th>
            }</For>
          </Suspense>
        </tr>
      </thead>

    </table>
  )
}
