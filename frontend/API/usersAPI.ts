export async function getUserByFirebaseAuthId(firebaseAuthId: string) {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_URL}/users/getUserByFirebaseAuthId/${firebaseAuthId}`,
			{
				mode: 'cors',
				cache: 'no-cache',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'GET',
			}
		);

		return response.json();
	} catch (e) {
		return { error: 'unknown error' };
	}
}

export async function createUser(data: {
	userName: string;
	firebaseAuthId: string;
	profileImgUrl: string;
}) {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_URL}/users/createUser`,
			{
				method: 'POST',
				mode: 'cors',
				cache: 'no-cache',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			}
		);

		return response.json();
	} catch (e) {
		return { error: 'unknown error' };
	}
}
