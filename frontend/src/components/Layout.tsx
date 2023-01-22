import { useEffect, useState } from 'react';
import styles from '../styles/LayoutStyle.module.scss';
import Header from './Header';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { googleSignInPopUp, googleSignOut } from './FirebaseInit';
import { Center, VStack } from '@chakra-ui/react';
import { logIn, logOut, UserAuth } from '../../slices/UserSlice';
import { useRouter } from 'next/router';

interface LayoutProps {
	children: (JSX.Element | null)[] | JSX.Element;
}

const Layout = (props: LayoutProps) => {
	// const [loggedIn, setLoggedIn] = useState<boolean>(false);
	// const loggedIn = useAppSelector((state: RootState) => state.user.loggedIn);
	const [loggedIn, setLoggedIn] = useState(false);
	const dispatch = useAppDispatch();
	const router = useRouter();

	const auth = getAuth();
	useEffect(() => {
		onAuthStateChanged(auth, user => {
			if (user) {
				console.log(user);

				const userAuth: UserAuth = {
					email: user.email,
					userDatabaseId: 7777777,
					userFirebaseId: user.uid,
					userName: user.displayName,
					userProfileImageUrl: user.photoURL,
				};
				dispatch(logIn(userAuth));
				setLoggedIn(true);
			} else {
				dispatch(logOut());
				setLoggedIn(false);
				router.push('/');
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
