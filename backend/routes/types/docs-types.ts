export interface DocDTO {
	docId: number;
	docUrl: string;
	docRef: string;
	docType: string;
	userId: number;
}

export interface CreateDocDTO {
	data: DocDTO;
}

export interface GetDocsByUserIdDTO {
	data: DocDTO[];
}

export interface DeleteDocsByIdsDTO {
	data: { successMessage: string };
}
