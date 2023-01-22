import { createSlice } from '@reduxjs/toolkit';

interface UserState {
	loggedIn: boolean;
	user: UserAuth | null;
}

const initialState: UserState = {
	loggedIn: false,
	user: null,
};

export interface UserAuth {
	email: string;
	userId: number;
	userName: string;
	userProfileImageUrl: string;
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logIn: (
			state,
			actions: {
				payload: UserAuth;
			}
		) => {
			state.loggedIn = true;
			state.user = actions.payload;
		},
		logOut: state => {
			state.loggedIn = false;
			state.user = null;
		},
	},
});

export const { logIn, logOut } = userSlice.actions;

export default userSlice.reducer;
