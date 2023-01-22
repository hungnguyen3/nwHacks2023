export async function createComment(data: { text: string; docId: number }) {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_URL}/comments/createComment`,
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

export async function getCommentsByDocId(docId: number) {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_URL}/comments/getCommentsByDocId/${docId}`,
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
