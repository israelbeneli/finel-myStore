import * as Yup from "yup";
import israeliIdValidation from "../israeliIdChack";
const customerValidationSchema = Yup.object({
	israeliId: Yup.string()
		.required("Israeli ID is required")
		.test("isValidIsraeliId", "Invalid Israeli ID", (value) =>
			israeliIdValidation(value)
		),
	name: Yup.object({
		first: Yup.string().min(3).max(255).required(),
		last: Yup.string().min(3).max(255).required(),
	}),
	phone: Yup.string()
		.matches(/^0[2-9]\d{7,8}$/, "Phone must be a ligel")
		.required("Phone is required"),
	email: Yup.string().min(6).max(255).required().email(),
	address: Yup.object({
		city: Yup.string().min(2).max(255).required(),
		street: Yup.string().min(2).max(255).required(),
		houseNumber: Yup.number().min(1).max(1024).required(),
	}),
});
export default customerValidationSchema;
