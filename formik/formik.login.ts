import * as Yup from "yup";

export interface LoginSuperAdmin {
	email: string;
	name: string;
	password: string;
	confirmPassword: string;
}

export const SuperAdminSchema = Yup.object().shape({
	name: Yup.string().notRequired(),
	email: Yup.string().email("Invalid email! 🚨 🥷🏼 📧").required("Required field! 🔴"),
	password: Yup.string()
		.min(10, "Needs at least 10 characters! 🚨 🥷🏼")
		.required("Required field! 🔴"),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref("password")], "Password does not match! 🚨 🥷🏼")
		.required("Required field! 🔴")
});

export const superAdminInit = {
	email: "",
	name: "",
	password: "",
	confirmPassword: ""
};
