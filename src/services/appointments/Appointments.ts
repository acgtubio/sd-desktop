import { invoke } from "@tauri-apps/api"
import { Appointment } from "./AppointmentTypes"

export const AddAppointmentSesssion = async (apptDetails: Appointment): Promise<string> => {
	return invoke("add_appointment", { appt: apptDetails })
}
