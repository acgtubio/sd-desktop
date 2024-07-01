import { Accessor, Component, ResourceReturn, createEffect, createResource, createSignal } from "solid-js";
import { AddAppointmentSesssion } from "../../services/appointments/Appointments";
import { Appointment } from "../../services/appointments/AppointmentTypes";
import { Show } from "solid-js";

type AppointmentProps = {
  clientId: Accessor<string>;
}

export const Appointments: Component<{}> = (props: AppointmentProps) => {
  const [appt, setAppt] = createSignal<Appointment | undefined>();
  const [data, { mutate, refetch }]: ResourceReturn<string, unknown> = createResource<string, Appointment, unknown>(appt, AddAppointmentSesssion);
  const d: Appointment = {
    purpose: "Purp",
    client_id: props.clientId(),
  };

  createEffect(() => {
    console.info(data());
  });

  return (
    <>
      <button onClick={() => setAppt(d)}>Click Me</button>
      <Show when={data.error}>
        <h1>There is an error.</h1>
      </Show>
      <Show when={data.state === "ready"}>
        <h1>{data()}</h1>
      </Show>
    </>
  )
}
