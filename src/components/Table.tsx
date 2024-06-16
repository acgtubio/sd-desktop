import { createResource, createEffect, Suspense, For } from "solid-js";
import { invoke } from '@tauri-apps/api';

export const Table = () => {
  const [headers] = createResource(async () => {
    return invoke("get_headers");
  });

  const [data] = createResource(async () => {
    return invoke("fetch_clients");
  });

  createEffect(() => {
    console.log(headers());
    console.log(data());
  });

  return (
    <table class="w-full">
      <thead class="text-lg border-b">
        <tr>
          <Suspense fallback="Fetching Headers">
            <For each={headers()}>{(header, i) =>
              <th class="text-left py-2">
                {header}
              </th>
            }</For>
          </Suspense>
        </tr>
      </thead>
      <tbody class="text-md">
        <Suspense fallback={<div>Loading Data...</div>}>
          <For each={data()}>{(item, i) =>
            <tr>
              <td>{item.firstname + " " + item.lastname}</td>
              <td>{item.address}</td>
            </tr>
          }</For>
        </Suspense>
      </tbody>
    </table>
  )
}
