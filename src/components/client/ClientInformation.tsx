import { Accessor, Component, Resource, ResourceReturn, Setter, Show, createEffect, createResource, createSignal, onMount } from "solid-js";
import { useClientInformationContext } from "../../state/ClientInformationState";
import { invoke } from "@tauri-apps/api";

type ClientData = {
  _id?: { $0id: string },
  firstname?: string,
  lastname?: string,
  address?: string
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
    <section>
      <Show when={client.loading}>
        <h1>
          Loading...
        </h1>
      </Show>
      <Show when={client.state === 'ready'}>
        <h1 class="text-3xl">
          {client()!.firstname + " " + client()!.lastname}
        </h1>
      </Show>
    </section>);
}
