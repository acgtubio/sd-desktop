import { Accessor, ParentComponent, Setter, createContext, createSignal, useContext } from "solid-js";

export type ClientInformationData = {
  ConsumeClientId: () => string,
  setClientId: Setter<string>,
}
const ClientInformationContext = createContext<ClientInformationData>();

export const ClientInformation: ParentComponent<{}> = (props) => {
  const [clientId, setClientId] = createSignal<string>("");

  const ConsumeClientId = (): string => {
    const storedClientId = clientId();
    setClientId("");

    return storedClientId;
  }

  return (
    <ClientInformationContext.Provider value={{ ConsumeClientId, setClientId }}>
      {props.children}
    </ClientInformationContext.Provider>
  )
}

export function useClientInformationContext(): ClientInformationData | undefined {
  return useContext(ClientInformationContext)
}
