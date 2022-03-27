import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { loadStatus } from "../../redux/store";
import { motion } from "framer-motion";
import { UtilCloseTheAlert } from "../../utils/util.alert";

const GlobalAlert = () => {
	const { alertMessage, alertTitle, showAlert, isSuccess } = useSelector(loadStatus);
	const dispatch = useDispatch();

	return showAlert ? (
		<motion.div
			key="global-alert-notification"
			initial={{ opacity: 0, x: 200 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: 200 }}
			aria-live="assertive"
			className="pointer-events-none fixed inset-0 z-999 flex items-end px-4 py-6 sm:items-start sm:p-6"
		>
			<div className="flex w-full flex-col items-center space-y-4 sm:items-end">
				{/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
				<div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
					<div className="p-4">
						<div className="flex items-start">
							<div className="flex-shrink-0">
								{isSuccess ? (
									<CheckCircleIcon
										className="h-6 w-6 text-green-400"
										aria-hidden="true"
									/>
								) : (
									<XCircleIcon
										className="h-6 w-6 text-red-400"
										aria-hidden="true"
									/>
								)}
							</div>
							<div className="ml-3 w-0 flex-1 pt-0.5">
								<p className="text-sm font-medium text-gray-900">
									{alertTitle}
								</p>
								<p className="mt-1 text-sm text-gray-500">{alertMessage}</p>
							</div>
							<div className="ml-4 flex flex-shrink-0">
								<button
									className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
									onClick={() => {
										UtilCloseTheAlert(dispatch);
									}}
								>
									<span className="sr-only">Close</span>
									<XIcon className="h-5 w-5" aria-hidden="true" />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	) : null;
};

export default GlobalAlert;
