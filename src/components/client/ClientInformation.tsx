import { Component, createEffect, createResource, createSignal, onMount } from "solid-js";
import { useClientInformationContext } from "../../state/ClientInformationState";
import { invoke } from "@tauri-apps/api";

export const ClientProfile: Component = () => {
  const [clientData, setClientData] = createSignal();
  const { ConsumeClientId, GetClientId } = useClientInformationContext() || {};

  if (!ConsumeClientId || !GetClientId) return;
  const clientId: string = ConsumeClientId();

  if (!clientId) return;
  const [client] = createResource(async () => {
    return invoke("fetch_client_data", { "id": clientId });
  });

  createEffect(() => {

    console.group("Client Information...");
    console.info(client());
    console.groupEnd();
  });

  return (
    <div>
      Hello
    </div>);
}
