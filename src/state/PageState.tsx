import { createContext, createSignal, useContext } from "solid-js";

const PageContext = createContext();

export const PageState = (props) => {
  const [pageState, setPageState] = createSignal("dashboard");

  return (
    <PageContext.Provider value={{ pageState, setPageState }}>
      {props.children}
    </PageContext.Provider>
  )
}

export function usePageContext() {
  return useContext(PageContext);
}
