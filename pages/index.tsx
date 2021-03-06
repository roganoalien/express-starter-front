// import { GetServerSidePropsContext } from "next";//ctx: GetServerSidePropsContext
import Image from "next/image";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import {
	superAdminInit,
	SuperAdminSchema,
	LoginSuperAdmin,
	userLoginInit,
	LoginUserLogin,
	LoginSchema
} from "../formik/formik.login";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../redux/slices/load.slice";
import { AnimatePresence, motion } from "framer-motion";
import { PageHome, ResponseIsSuper } from "../types";
import { UtilShowGlobalAlert } from "../utils/util.alert";

export default function Home({ createSuperAdmin }: PageHome) {
	const dispatch = useDispatch();
	const [showSuperAdmin, setShowSuperAdmin] = useState<boolean>(createSuperAdmin);
	const [showPass, setShowPass] = useState<boolean>(false);
	const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);
	const [startedSubmitting, setStartedSubmitting] = useState<boolean>(false);

	return (
		<main className="container mx-auto">
			<section className="home-screen flex min-h-screen w-full items-center justify-center">
				<article className="flex w-full flex-col items-center justify-center">
					<Image src="/assets/global/logo-2022.svg" width={100} height={120} />
					<AnimatePresence exitBeforeEnter>
						{showSuperAdmin ? (
							<motion.div
								key="login-register-superAdmin"
								className="mt-10 flex w-full flex-col items-center justify-center rounded-md bg-white shadow-2xl sm:w-8/12 md:w-6/12 lg:w-4/12"
								initial={{ opacity: 0, x: 0 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -100 }}
							>
								<Formik
									initialValues={superAdminInit}
									validationSchema={SuperAdminSchema}
									onSubmit={async (
										values: LoginSuperAdmin,
										{ resetForm }
									) => {
										setStartedSubmitting(true);
										dispatch(startLoading());
										if (values.email !== "" && values.password !== "") {
											fetch("/api/auth/superAdmin", {
												method: "POST",
												body: JSON.stringify(values),
												headers: {
													"content-type": "application/json"
												}
											})
												.then((res) => res.json())
												.then((response) => {
													console.log(response);
													if (response.status === 200) {
														UtilShowGlobalAlert({
															dispatch,
															isSuccess: true,
															message:
																"Please login to access dashboard.",
															title: "Registered Admin User!"
														});
														setTimeout(() => {
															resetForm();
															setStartedSubmitting(false);
															setShowSuperAdmin(false);
															dispatch(stopLoading());
														}, 750);
													} else {
														UtilShowGlobalAlert({
															dispatch,
															isSuccess: false,
															message: "Something went wrong!",
															title: "Please try again."
														});
														dispatch(stopLoading());
														setStartedSubmitting(false);
													}
												})
												.catch(console.error);
										}
									}}
								>
									{({ errors, touched }) => (
										<Form className="w-full p-10">
											<h1 className="mb-5 text-center font-bold uppercase text-mBlack opacity-25">
												Create Super Admin
											</h1>
											<div className="rounded-md border border-gray-300 px-3 py-2 text-mBlack focus-within:border-mBlack focus-within:ring-1 focus-within:ring-mBlack">
												<label
													htmlFor="name"
													className="block text-xs font-medium text-mGray"
												>
													Name
												</label>
												<Field
													type="text"
													name="name"
													id="name"
													className="block w-full border-0 p-0 placeholder-mGray outline-mBlack focus:ring-0 sm:text-sm"
													placeholder="John Doe"
												/>
											</div>
											<div
												className={`mt-6 rounded-md border border-gray-300 px-3 py-2 text-mBlack transition-all duration-150 ease-in-out focus-within:border-mBlack focus-within:ring-1 focus-within:ring-mBlack ${
													touched.email && errors.email
														? "border-red-600 focus-within:border-red-600 focus-within:ring-red-600"
														: touched.email && !errors.email
														? "border-green-500 text-green-600 focus-within:border-green-500 focus-within:ring-green-500"
														: ""
												}`}
											>
												<label
													htmlFor="email"
													className="block text-xs font-medium text-mGray"
												>
													Email *{" "}
													{touched.email && errors.email ? (
														<span className="text-xs text-red-600">
															{errors.email}
														</span>
													) : null}
												</label>
												<Field
													type="email"
													name="email"
													id="email"
													className="block w-full border-0 p-0 placeholder-mGray outline-mBlack focus:ring-0 sm:text-sm"
													placeholder="john@doe.com"
													required
												/>
											</div>
											<div
												className={`relative mt-6 rounded-md border border-gray-300 px-3 py-2 text-mBlack transition-all duration-150 ease-in-out focus-within:border-mBlack focus-within:ring-1 focus-within:ring-mBlack ${
													touched.password && errors.password
														? "border-red-600 focus-within:border-red-600 focus-within:ring-red-600"
														: touched.password && !errors.password
														? "border-green-500 text-green-600 focus-within:border-green-500 focus-within:ring-green-500"
														: ""
												}`}
											>
												<label
													htmlFor="password"
													className="block text-xs font-medium text-mGray"
												>
													Password *{" "}
													{touched.password && errors.password ? (
														<span className="text-xs text-red-600">
															{errors.password}
														</span>
													) : null}
												</label>
												<span
													onClick={() => setShowPass(!showPass)}
													className="absolute right-0 top-0 z-10 h-full cursor-pointer p-4"
												>
													{showPass ? (
														<EyeIcon className="h-6 w-6 stroke-current text-mGray" />
													) : (
														<EyeOffIcon className="h-6 w-6 stroke-current text-mGray" />
													)}
												</span>
												<Field
													type={showPass ? "text" : "password"}
													name="password"
													id="password"
													className="block w-full border-0 p-0 placeholder-mGray outline-mBlack focus:ring-0 sm:text-sm"
													required
												/>
											</div>
											<div
												className={`relative mt-6 rounded-md border border-gray-300 px-3 py-2 text-mBlack transition-all duration-150 ease-in-out focus-within:border-mBlack focus-within:ring-1 focus-within:ring-mBlack ${
													touched.confirmPassword &&
													errors.confirmPassword
														? "border-red-600 focus-within:border-red-600 focus-within:ring-red-600"
														: touched.confirmPassword &&
														  !errors.confirmPassword
														? "border-green-500 text-green-600 focus-within:border-green-500 focus-within:ring-green-500"
														: ""
												}`}
											>
												<label
													htmlFor="confirmPassword"
													className="block text-xs font-medium text-mGray"
												>
													Confirm password *{" "}
													{touched.confirmPassword &&
													errors.confirmPassword ? (
														<span className="text-xs text-red-600">
															{errors.confirmPassword}
														</span>
													) : null}
												</label>
												<span
													onClick={() =>
														setShowConfirmPass(!showConfirmPass)
													}
													className="absolute right-0 top-0 z-10 h-full cursor-pointer p-4"
												>
													{showConfirmPass ? (
														<EyeIcon className="h-6 w-6 stroke-current text-mGray" />
													) : (
														<EyeOffIcon className="h-6 w-6 stroke-current text-mGray" />
													)}
												</span>
												<Field
													type={
														showConfirmPass ? "text" : "password"
													}
													name="confirmPassword"
													id="confirmPassword"
													className="block w-full border-0 p-0 placeholder-mGray outline-mBlack focus:ring-0 sm:text-sm"
													required
												/>
											</div>
											<div className="mt-5 flex w-full items-center justify-center">
												<button
													type="submit"
													disabled={startedSubmitting ? true : false}
													className={`w-full cursor-pointer rounded-md py-3 text-white transition-all duration-150 ease-in-out ${
														startedSubmitting
															? "cursor-not-allowed bg-gray-600"
															: "bg-mBlack hover:bg-gray-700"
													}`}
												>
													{startedSubmitting ? (
														<span className="animate-pulse">
															Enviando
														</span>
													) : (
														"Register Super Admin"
													)}
												</button>
											</div>
										</Form>
									)}
								</Formik>
							</motion.div>
						) : (
							<motion.div
								key="login-login-form"
								className="mt-10 flex w-full flex-col items-center justify-center rounded-md bg-white shadow-2xl sm:w-8/12 md:w-6/12 lg:w-4/12"
								initial={{ opacity: 0, x: 100 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -100 }}
							>
								<Formik
									initialValues={userLoginInit}
									validationSchema={LoginSchema}
									onSubmit={async (values: LoginUserLogin) => {
										setStartedSubmitting(true);
										dispatch(startLoading());
										if (values.email !== "" && values.password !== "") {
											fetch("/api/auth/login", {
												method: "POST",
												body: JSON.stringify(values),
												headers: {
													"content-type": "application/json"
												}
											})
												.then((res) => res.json())
												.then((response) => {
													console.log(response);
													if (response.status === 200) {
														UtilShowGlobalAlert({
															dispatch,
															isSuccess: true,
															message: "Welcome back! ???????? ???????",
															title: "Logged in!"
														});
														// AND LOGIN SETTING THE TOKEN
														setTimeout(() => {
															setStartedSubmitting(false);
															// setShowSuperAdmin(false);
															dispatch(stopLoading());
														}, 750);
													}
												})
												.catch(console.error);
										}
									}}
								>
									{({ errors, touched }) => (
										<Form className="w-full p-10">
											<h1 className="mb-5 text-center font-bold uppercase text-mBlack opacity-25">
												Login
											</h1>
											<div
												className={`mt-6 rounded-md border border-gray-300 px-3 py-2 text-mBlack transition-all duration-150 ease-in-out focus-within:border-mBlack focus-within:ring-1 focus-within:ring-mBlack ${
													touched.email && errors.email
														? "border-red-600 focus-within:border-red-600 focus-within:ring-red-600"
														: touched.email && !errors.email
														? "border-green-500 text-green-600 focus-within:border-green-500 focus-within:ring-green-500"
														: ""
												}`}
											>
												<label
													htmlFor="email"
													className="block text-xs font-medium text-mGray"
												>
													Email *{" "}
													{touched.email && errors.email ? (
														<span className="text-xs text-red-600">
															{errors.email}
														</span>
													) : null}
												</label>
												<Field
													type="email"
													name="email"
													id="email"
													className="block w-full border-0 p-0 placeholder-mGray outline-mBlack focus:ring-0 sm:text-sm"
													placeholder="john@doe.com"
													required
												/>
											</div>
											<div
												className={`relative mt-6 rounded-md border border-gray-300 px-3 py-2 text-mBlack transition-all duration-150 ease-in-out focus-within:border-mBlack focus-within:ring-1 focus-within:ring-mBlack ${
													touched.password && errors.password
														? "border-red-600 focus-within:border-red-600 focus-within:ring-red-600"
														: touched.password && !errors.password
														? "border-green-500 text-green-600 focus-within:border-green-500 focus-within:ring-green-500"
														: ""
												}`}
											>
												<label
													htmlFor="password"
													className="block text-xs font-medium text-mGray"
												>
													Password *{" "}
													{touched.password && errors.password ? (
														<span className="text-xs text-red-600">
															{errors.password}
														</span>
													) : null}
												</label>
												<span
													onClick={() => setShowPass(!showPass)}
													className="absolute right-0 top-0 z-10 h-full cursor-pointer p-4"
												>
													{showPass ? (
														<EyeIcon className="h-6 w-6 stroke-current text-mGray" />
													) : (
														<EyeOffIcon className="h-6 w-6 stroke-current text-mGray" />
													)}
												</span>
												<Field
													type={showPass ? "text" : "password"}
													name="password"
													id="password"
													className="block w-full border-0 p-0 placeholder-mGray outline-mBlack focus:ring-0 sm:text-sm"
													required
												/>
											</div>
											<div className="mt-5 flex w-full items-center justify-center">
												<button
													type="submit"
													disabled={startedSubmitting ? true : false}
													className={`w-full cursor-pointer rounded-md py-3 text-white transition-all duration-150 ease-in-out ${
														startedSubmitting
															? "cursor-not-allowed bg-gray-600"
															: "bg-mBlack hover:bg-gray-700"
													}`}
												>
													{startedSubmitting ? (
														<span className="animate-pulse">
															Enviando
														</span>
													) : (
														"Register Super Admin"
													)}
												</button>
											</div>
										</Form>
									)}
								</Formik>
							</motion.div>
						)}
					</AnimatePresence>
				</article>
			</section>
		</main>
	);
}

export async function getServerSideProps() {
	const superAdmin: ResponseIsSuper = await fetch(`${process.env.BACKEND_URL}/auth/local`)
		.then((res) => res.json())
		.catch(console.error);
	return {
		props: {
			createSuperAdmin: superAdmin?.can_create || false
		}
	};
}
