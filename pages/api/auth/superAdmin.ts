import { Response } from "express";
import { ApiResponseSuperAdmin } from "../../../types";

export default async function handler(req: Request, res: Response) {
	const { email, name, password }: any = req.body;

	const response: ApiResponseSuperAdmin = await fetch(
		`${process.env.BACKEND_URL}/auth/local/registerSuper`,
		{
			method: "POST",
			body: JSON.stringify({
				name,
				email,
				password
			}),
			headers: {
				"content-type": "application/json"
			}
		}
	)
		.then((res) => res.json())
		.then((resData) => resData)
		.catch((err) => {
			console.error(err);
		});
	res.status(200).json({ ...response });
}
