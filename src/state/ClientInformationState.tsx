import { Accessor, ParentComponent, Setter, createContext, createSignal, useContext } from "solid-js";

export type ClientInformationData = {
  clientId: Accessor<string>,
  setClientId: Setter<string>,
}
const ClientInformationContext = createContext<ClientInformationData>();

export const ClientInformationProvider: ParentComponent<{}> = (props) => {
  const [clientId, setClientId] = createSignal<string>("");

  return (
    <ClientInformationContext.Provider value={{ clientId, setClientId }}>
      {props.children}
    </ClientInformationContext.Provider>
  )
}

export function useClientInformationContext(): ClientInformationData | undefined {
  return useContext(ClientInformationContext)
}
