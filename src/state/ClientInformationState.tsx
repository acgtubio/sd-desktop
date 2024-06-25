import { Accessor, ParentComponent, Setter, createContext, createSignal, useContext } from "solid-js";

export type ClientInformationData = {
  ConsumeClientId: () => string,
  SetClientId: (clientId: string) => void,
  GetClientId: () => Accessor<string>
}
const ClientInformationContext = createContext<ClientInformationData>();

export const ClientInformation: ParentComponent<{}> = (props) => {
  const [clientId, setClientId] = createSignal<string>("");

  const ConsumeClientId = (): string => {
    console.group("Consuming Client Id:");
    console.log(clientId());
    console.groupEnd();

    const storedClientId = clientId();
    setClientId("");

    return storedClientId;
  }

  const SetClientId = (clientIdString: string) => {
    setClientId(clientIdString);
    console.group("Setting Client Id.");
    console.log(clientIdString);
    console.log(clientId());
    console.groupEnd();
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
