import { useEffect, useState } from 'react';
import styles from '../styles/LayoutStyle.module.scss';
import Header from './Header';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { RootState } from '../../store';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { googleSignInPopUp } from './FirebaseInit';
import { Center, VStack } from '@chakra-ui/react';
import { logIn, UserAuth } from '../../slices/UserSlice';

interface LayoutProps {
	children: (JSX.Element | null)[] | JSX.Element;
}

const Layout = (props: LayoutProps) => {
	// const [loggedIn, setLoggedIn] = useState<boolean>(false);
	const loggedIn = useAppSelector((state: RootState) => state.user.loggedIn);
	const dispatch = useAppDispatch();

	const auth = getAuth();
	useEffect(() => {
		onAuthStateChanged(auth, user => {
			if (user) {
				console.log(user);
				const userAuth: UserAuth = {
					email: user.email,
					userId: Number(user.uid),
					userName: user.displayName,
					userProfileImageUrl: user.photoURL,
				};
				dispatch(logIn());
			} else {
				// User is signed out
				// ...
			}
		});
	}, [loggedIn]);

	if (!loggedIn)
		return (
			<Center bg="tomato" color="white" width="100%" height="100vh">
				<VStack>
					<div>
						<h1>Welcome 👋.</h1>
					</div>
					<button onClick={googleSignInPopUp} className={styles.loginButton}>
						Sign in with Google
					</button>
				</VStack>
			</Center>
		);

	return (
		<div className={styles.background}>
			<div className={styles.pageContainer}>
				<Header />
				<div className={styles.contentContainer}>{props.children}</div>
			</div>
		</div>
	);
};

export default Layout;
