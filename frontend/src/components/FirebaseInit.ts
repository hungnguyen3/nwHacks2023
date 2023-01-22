// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signOut,
	signInWithPopup,
	GoogleAuthProvider,
} from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { createUser, getUserByFirebaseAuthId } from '../../API/usersAPI';
import { useAppDispatch } from '../../hooks';
import { populateUserDbId } from '../../slices/UserSlice';

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_APIKEY,
	authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
	projectId: process.env.NEXT_PUBLIC_PROJECTID,
	storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
	appId: process.env.NEXT_PUBLIC_APPID,
	measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID,
};

const provider = new GoogleAuthProvider();

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

function timeout(delay: number) {
	return new Promise(res => setTimeout(res, delay));
}

export const googleSignInPopUp = () =>
	signInWithPopup(auth, provider)
		.then(async result => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential.accessToken;
			// The signed-in user info.
			const user = result.user;
			// ...
			const dataBaseUser = await getUserByFirebaseAuthId(user.uid);

			timeout(3000);
			if (!dataBaseUser.error) {
				console.log(dataBaseUser);
			} else {
				const create = await createUser({
					userName: user.displayName,
					firebaseAuthId: user.uid,
					profileImgUrl: user.photoURL,
				});

				if (!create.error) {
					alert('successfully logged in!');
				} else {
					alert('something wrong while creating a user');
				}
			}
		})
		.catch(error => {
			console.log(error);
			alert('something wrong while creating a user');
		});

export const googleSignOut = () =>
	signOut(auth)
		.then(() => {
			// Sign-out successful.
		})
		.catch(error => {
			// An error happened.
		});

export const storage = getStorage(app);
