import { createResource, createEffect, Suspense, For, Setter } from "solid-js";
import { invoke } from '@tauri-apps/api';
import './Table.scss';
import { usePageContext } from "../../state/PageState";
import { useClientInformationContext } from "../../state/ClientInformationState";

type MongoId = {
  $oid: string,
}

export const Table = () => {
  const { setPageState } = usePageContext();
  const { SetClientId } = useClientInformationContext() || {};

  let trElement: HTMLTableRowElement;

  const [headers] = createResource(async () => {
    return invoke("get_headers");
  });

  const [data] = createResource(async () => {
    return invoke("fetch_clients");
  });

  createEffect(() => {
    console.group("Table data");
    console.info(headers());
    console.info(data());
    console.groupEnd();
  });

  const tableRowClickHandler = (id: MongoId, e: MouseEvent<HTMLTableRowElement>) => {
    if (!SetClientId) return;
    SetClientId(id.$oid);

    setPageState("user");
  }

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
            <tr class="hover:bg-neutral-100 cursor-pointer" ref={trElement} onClick={[tableRowClickHandler, item._id]}>
              <td class="font-medium">{item.firstname + " " + item.lastname}</td>
              <td>{item.address}</td>
            </tr>
          }</For>
        </Suspense>
      </tbody>
    </table>
  )
}
