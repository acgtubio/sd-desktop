import { Component } from "solid-js";
import { Table } from "./Table";

export const Dashboard: Component = (props) => {
  return (
    <section class="w-full p-5">
      <h1 class="font-bold text-3xl">Dashboard</h1>
      <hr class="my-5" />
      <Table />
    </section>
  );
}
