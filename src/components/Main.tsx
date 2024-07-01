import { Dynamic } from "solid-js/web"
import { Dashboard } from "./dashboard/Dashboard"
import { usePageContext } from "../state/PageState"
import { ClientProfile } from "./client/ClientInformation"
import { Component } from "solid-js"

const pageContentOptions = {
  "dashboard": {
    "header": "Dashboard",
    "content": () => <Dashboard />,
  },
  "user": {
    "header": "Information",
    "content": () => <ClientProfile />,
  },
}

export const Main: Component = () => {
  const { pageState } = usePageContext();

  return (
    <main class='w-full p-5'>
      <h1 class="font-bold text-2xl">{pageContentOptions[pageState()].header}</h1>
      <hr class="my-4" />
      <Dynamic component={pageContentOptions[pageState()].content} />
    </main>
  )
}
