import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoadingState {
	isLoading: boolean;
}

const initialState: LoadingState = {
	isLoading: false
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
		}
	}
});

export const { startLoading, stopLoading } = userSlice.actions;
export default userSlice.reducer;
