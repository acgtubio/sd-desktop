import { Accessor, Component, Resource, ResourceReturn, Setter, Show, createEffect, createResource, createSignal, onMount } from "solid-js";
import { useClientInformationContext } from "../../state/ClientInformationState";
import { invoke } from "@tauri-apps/api";
import { Appointments } from "../appointments/Appointments";

type ClientData = {
  _id?: { $0id: string },
  firstname?: string,
  lastname?: string,
  address?: string,
  balance?: string,
}

const fetchClientData = async (clientId: string): Promise<ClientData> => {
  return invoke("fetch_client_data", { "id": clientId });
}

export const ClientProfile: Component = () => {
  const [clientId, setClientId]: [Accessor<string>, Setter<string>] = createSignal<string>("");
  const [client]: ResourceReturn<ClientData, unknown> = createResource<ClientData, string, unknown>(clientId, fetchClientData);

  onMount(() => {
    const { ConsumeClientId, GetClientId } = useClientInformationContext() || {};

    if (!ConsumeClientId || !GetClientId) return;
    setClientId(ConsumeClientId());
  })

  return (
    <section class="bg-slate-50 px-7 py-4 rounded-lg shadow-md">
      <Show when={client.loading}>
        <h1>
          Loading...
        </h1>
      </Show>
      <Show when={client.state === 'ready'}>
        <div class="">
          <h1 class="text-lg font-bold">
            {client()!.firstname + " " + client()!.lastname}
          </h1>
          <div class="border px-4 py-2">
            <h4 class="font-bold text-sm">
              {client()!.balance}
            </h4>
          </div>
        </div>

        <div class="bg-slate-200 rounded shadow-md">
          <Appointments clientId={clientId} />
        </div>
      </Show>
    </section>
  );
}
