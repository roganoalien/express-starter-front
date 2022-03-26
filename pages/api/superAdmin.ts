import { Response } from "express";
import { m } from "framer-motion";

export default async function handler(req: Request, res: Response) {
	const { email, name, password }: any = req.body;
	// console.log("API SUPERADMIN");
	console.table(req.body);
	const resData = await fetch(`${process.env.BACKEND_URL}/auth/local/registerSuper`, {
		method: "POST",
		body: JSON.stringify({
			name,
			email,
			password
		}),
		headers: {
			"content-type": "application/json"
		}
	})
		.then((res) => res.json())
		.catch((err) => {
			console.error(err);
		});
	res.status(200).json({ resData });
	// res.status(200).json({ name: "John Doe" });
}
