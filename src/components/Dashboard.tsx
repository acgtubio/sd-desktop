import { Component, For, createEffect } from "solid-js";
import { invoke } from '@tauri-apps/api';
import { createResource } from "solid-js";
import { Suspense } from "solid-js";

export const Dashboard: Component = (props) => {
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
      <tbody>
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
