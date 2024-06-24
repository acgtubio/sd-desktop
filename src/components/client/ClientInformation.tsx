import { Component, createEffect, createResource, createSignal, onMount } from "solid-js";
import { useClientInformationContext } from "../../state/ClientInformationState";
import { invoke } from "@tauri-apps/api";

export const ClientProfile: Component = () => {
  const [clientData, setClientData] = createSignal();

  onMount(() => {
    const { ConsumeClientId } = useClientInformationContext() || {};

    if (!ConsumeClientId) return;
    const clientId: string = ConsumeClientId();

    const [client] = createResource(async () => {
      return invoke("fetch_client_data", { id: clientId })
    });

    console.group("Client Profile Mounted...");
    console.info(clientId);
    console.groupEnd();

    console.group("Client Information...");
    console.info(client());
    console.groupEnd();
  });

  createEffect(() => {
  });

  return (
    <div>
      Hello
    </div>);
}
