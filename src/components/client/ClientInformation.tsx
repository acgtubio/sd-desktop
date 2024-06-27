import { Accessor, Component, Setter, Show, createEffect, createResource, createSignal, onMount } from "solid-js";
import { useClientInformationContext } from "../../state/ClientInformationState";
import { invoke } from "@tauri-apps/api";

type ClientData = {
  _id?: { $0id: string },
  firstname?: string,
  lastname?: string,
  address?: string
}

const fetchClientData = async (clientId: string) => {
  return invoke("fetch_client_data", { "id": clientId });
}

export const ClientProfile: Component = () => {
  const [clientId, setClientId]: [Accessor<string>, Setter<string>] = createSignal("");
  const [client] = createResource(clientId, fetchClientData);

  onMount(() => {
    const { ConsumeClientId, GetClientId } = useClientInformationContext() || {};

    if (!ConsumeClientId || !GetClientId) return;
    setClientId(ConsumeClientId());
  })

  return (
    <div>
      <Show when={client.loading}>
        <h1>
          Loading...
        </h1>
      </Show>
      <Show when={client.state === 'ready'}>
        <h1>
          {client().firstname}
        </h1>
      </Show>
    </div>);
}
