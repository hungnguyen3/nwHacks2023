export async function getDocsByUserId(userId: number) {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_URL}/docs/getDocsByUserId/${userId}`,
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
		console.log(e);
		return { error: 'unknown error' };
	}
}

export async function createDoc(data: {
	userId: number;
	docUrl: string;
	docRef: string;
	docType: string;
}) {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_URL}/docs/createDoc`,
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

export async function deleteDocsByIds(data: { docIds: number[] }) {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_URL}/docs/deleteDocsByIds`,
			{
				method: 'DELETE',
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

export async function getDocById(docId: number) {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_URL}/docs/getDocById/${docId}`,
			{
				method: 'GET',
				mode: 'cors',
				cache: 'no-cache',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		return response.json();
	} catch (e) {
		console.log(e);
		return { error: 'unknown error' };
	}
}
