import { expect, test } from "vitest";
import { AddAppointmentSesssion } from "../services/appointments/Appointments";
import { Appointment } from "../services/appointments/AppointmentTypes";


test("Add appointment to print 'Result'", async () => {
	const testValue: Appointment = {
		purpose: "Test lmao",
	}
	const result = await AddAppointmentSesssion(testValue);

	expect(result).toBe("Result");
});

