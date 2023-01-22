import { useEffect, useState } from 'react';
import styles from '../styles/LayoutStyle.module.scss';
import Header from './Header';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { googleSignInPopUp, googleSignOut } from './FirebaseInit';
import { Box, Center, VStack } from '@chakra-ui/react';
import { logIn, logOut, UserAuth } from '../../slices/UserSlice';
import { useRouter } from 'next/router';
import { RootState } from '../../store';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import ReactMarkdown from 'react-markdown';

interface LayoutProps {
	children: (JSX.Element | null)[] | JSX.Element;
}

const Layout = (props: LayoutProps) => {
	const loggedIn = useAppSelector((state: RootState) => state.user.loggedIn);
	const dispatch = useAppDispatch();
	const router = useRouter();
	const auth = getAuth();

	useEffect(() => {
		onAuthStateChanged(auth, user => {
			if (user) {
				const userAuth: UserAuth = {
					email: user.email,
					userDatabaseId: 7777777,
					userFirebaseId: user.uid,
					userName: user.displayName,
					userProfileImageUrl: user.photoURL,
				};
				dispatch(logIn(userAuth));
			} else {
				dispatch(logOut());
				router.push('/');
			}
		});
	}, [loggedIn]);

	if (!loggedIn)
		return (
			<Center
				bg="tomato"
				color="white"
				width="100%"
				height="100vh"
				backgroundImage={
					'https://drive.google.com/uc?export=download&id=1bdYJVn06i-LdiduRm1ffgZKVa-6R9R8h'
				}
				style={{ backgroundSize: 'cover', backgroundPosition: 'center' }}
			>
				<VStack
					alignItems="center"
					justify="flex-start"
					marginTop="30%"
					marginRight="-50%"
				>
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
