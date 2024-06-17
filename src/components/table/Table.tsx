import { createResource, createEffect, Suspense, For } from "solid-js";
import { invoke } from '@tauri-apps/api';
import './Table.scss';

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
      <thead class="table-head text-sm">
        <tr>
          <Suspense fallback="Fetching Headers">
            <For each={headers()}>{(header, i) =>
              <th class="text-left py-2 px-6">
                {header}
              </th>
            }</For>
          </Suspense>
        </tr>
      </thead>
      <tbody class="text-sm [&_td]:px-6 [&_td]:py-2 table-body">
        <Suspense fallback={<div>Loading Data...</div>}>
          <For each={data()}>{(item, i) =>
            <tr class="hover:bg-neutral-100 cursor-pointer">
              <td class="font-medium">{item.firstname + " " + item.lastname}</td>
              <td>{item.address}</td>
            </tr>
          }</For>
        </Suspense>
      </tbody>
    </table>
  )
}
