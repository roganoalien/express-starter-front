import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoadingState {
	isLoading?: boolean;
	showAlert?: boolean;
	alertTitle?: string | null;
	alertMessage?: string | null;
	isSuccess?: boolean;
}

export interface AlertPayload {
	alertMessage: string;
	alertTitle: string;
}

const initialState: LoadingState = {
	isLoading: false,
	isSuccess: true,
	showAlert: false,
	alertMessage: null, // null
	alertTitle: null //null
};

export const userSlice = createSlice({
	name: "load",
	initialState,
	reducers: {
		startLoading: (state) => {
			state.isLoading = true;
		},
		stopLoading: (state) => {
			state.isLoading = false;
		},
		successAlert: (state, action: PayloadAction<AlertPayload>) => {
			state.isSuccess = true;
			state.showAlert = true;
			state.alertMessage = action.payload.alertMessage;
			state.alertTitle = action.payload.alertTitle;
		},
		errorAlert: (state, action: PayloadAction<AlertPayload>) => {
			state.isSuccess = false;
			state.showAlert = true;
			state.alertMessage = action.payload.alertMessage;
			state.alertTitle = action.payload.alertTitle;
		},
		closeAlert: (state) => {
			state.showAlert = false;
		},
		resetStrings: (state) => {
			state.isSuccess = true;
			state.alertMessage = null;
			state.alertTitle = null;
		}
	}
});

export const {
	startLoading,
	stopLoading,
	successAlert,
	errorAlert,
	closeAlert,
	resetStrings
} = userSlice.actions;
export default userSlice.reducer;
