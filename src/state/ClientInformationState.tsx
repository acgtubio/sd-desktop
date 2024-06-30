import { Accessor, ParentComponent, createContext, createSignal, useContext } from "solid-js";

export type ClientInformationData = {
  ConsumeClientId: () => string,
  SetClientId: (clientId: string) => void,
  GetClientId: () => Accessor<string>
}

const ClientInformationContext = createContext<ClientInformationData>();

export const ClientInformation: ParentComponent<{}> = (props) => {
  const [clientId, setClientId] = createSignal<string>("");

  const ConsumeClientId = (): string => {
    const storedClientId = clientId();
    setClientId("");

    return storedClientId;
  }

  const SetClientId = (clientIdString: string) => {
    setClientId(clientIdString);
  }

  const GetClientId = (): Accessor<string> => {
    return clientId;
  }

  return (
    <ClientInformationContext.Provider value={{ ConsumeClientId, SetClientId, GetClientId }}>
      {props.children}
    </ClientInformationContext.Provider>
  )
}

export function useClientInformationContext(): ClientInformationData | undefined {
  return useContext(ClientInformationContext)
}
