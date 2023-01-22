import { createSlice } from '@reduxjs/toolkit';

interface UserState {
	loggedIn: boolean;
	user: UserAuth | null;
	userDbId: number;
}

const initialState: UserState = {
	loggedIn: false,
	user: null,
	userDbId: 0,
};

export interface UserAuth {
	email: string;
	userFirebaseId: string;
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
			state.userDbId = 0;
		},
		populateUserDbId: (
			state,
			actions: {
				payload: number;
			}
		) => {
			state.loggedIn = true;
			state.userDbId = actions.payload;
		},
	},
});

export const { logIn, logOut, populateUserDbId } = userSlice.actions;

export default userSlice.reducer;
