import { Component, onMount } from "solid-js";
import { useClientInformationContext } from "../../state/ClientInformationState";

export const ClientProfile: Component = () => {

  onMount(() => {
    const { ConsumeClientId } = useClientInformationContext() || {};

    if (!ConsumeClientId) return;
    const clientId: string = ConsumeClientId();

    console.group("Client Profile Mounted...");
    console.info(clientId);
    console.groupEnd();
  });

  return (
    <div>
      Hello
    </div>
  );
}
