import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PayloadNameUpdate {
	name: string;
}

interface PayloadUser {
	id: number;
	confirmed: boolean;
	email: string;
	is_super_admin: boolean;
	name: string | null;
	permission: string;
	token: string;
}

interface UserState {
	id: number | null;
	confirmed: boolean | null;
	email: string | null;
	is_super_admin: boolean | null;
	name: string | null;
	permission: string | null;
	token: string | null;
}

const initialState: UserState = {
	id: null,
	confirmed: null,
	email: null,
	is_super_admin: null,
	name: null,
	permission: null,
	token: null
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		logIn: (state, action: PayloadAction<PayloadUser>) => {
			state.id = action.payload.id;
			state.confirmed = action.payload.confirmed;
			state.email = action.payload.email;
			state.is_super_admin = action.payload.is_super_admin;
			state.name = action.payload.name;
			state.permission = action.payload.permission;
			state.token = action.payload.token;
		},
		logOut: (state) => {
			state.id = null;
			state.confirmed = null;
			state.email = null;
			state.is_super_admin = null;
			state.name = null;
			state.permission = null;
			state.token = null;
		},
		updateName: (state, action: PayloadAction<PayloadNameUpdate>) => {
			state.name = action.payload.name;
		}
	}
});

export const { logIn, logOut, updateName } = userSlice.actions;
export default userSlice.reducer;
