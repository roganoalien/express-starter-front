import { Dispatch } from "@reduxjs/toolkit";
import {
	AlertPayload,
	closeAlert,
	errorAlert,
	resetStrings,
	successAlert
} from "../redux/slices/load.slice";
import { UtilGlobalAlert } from "../types";

export const UtilCloseTheAlert = (dispatch: Dispatch) => {
	dispatch(closeAlert());
	setTimeout(() => {
		dispatch(resetStrings());
	}, 500);
};

export const UtilShowGlobalAlert = ({
	dispatch,
	isSuccess,
	message,
	title
}: UtilGlobalAlert) => {
	const messageObject: AlertPayload = { alertMessage: message, alertTitle: title };
	dispatch(isSuccess ? successAlert(messageObject) : errorAlert(messageObject));
	setTimeout(() => {
		UtilCloseTheAlert(dispatch);
	}, 5000);
};
