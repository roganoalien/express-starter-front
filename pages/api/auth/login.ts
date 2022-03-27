import { Response } from "express";
import { ApiResponseLogin } from "../../../types";

export default async function handler(req: Request, res: Response) {
	const { email, password }: any = req.body;

	const response: ApiResponseLogin = await fetch(
		`${process.env.BACKEND_URL}/auth/local/login`,
		{
			method: "POST",
			body: JSON.stringify({
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
