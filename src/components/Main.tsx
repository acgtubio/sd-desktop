import { Dynamic } from "solid-js/web"
import { Dashboard } from "./dashboard/Dashboard"
import { usePageContext } from "../state/PageState"
import { ClientProfile } from "./client/ClientInformation"

const pageContentOptions = {
  "dashboard": {
    "header": "Dashboard",
    "content": () => <Dashboard />,
  },
  "user": {
    "header": "Patient Information",
    "content": () => <ClientProfile />,
  },
}

export const Main = () => {
  const { pageState } = usePageContext();

  return (
    <main class='w-full p-5'>
      <h1 class="font-bold text-2xl">{pageContentOptions[pageState()].header}</h1>
      <hr class="my-4" />
      <Dynamic component={pageContentOptions[pageState()].content} />
    </main>
  )
}
