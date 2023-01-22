import { client, firebaseStorage } from '../../src/index';
import express from 'express';
import {
	CreateDocDTO,
	DeleteDocsByIdsDTO,
	GetDocsByUserIdDTO,
} from '../types/docs-types';
import { ErrorDTO } from '../types/errors-types';

export const createDoc = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		if (
			!(
				req.body.docUrl &&
				req.body.docRef &&
				req.body.docType &&
				req.body.userId
			)
		) {
			return res.status(400).send({
				error: 'missing required parameter(s)',
			});
		}
		const createDocRes = await client.query(
			`INSERT INTO docs ("docUrl", "docRef", "docType", "userId")
            VALUES ($1, $2, $3, $4)
            RETURNING *;`,
			[req.body.docUrl, req.body.docRef, req.body.docType, req.body.userId]
		);

		if (createDocRes.rowCount === 1) {
			return res
				.status(200)
				.send({ data: createDocRes.rows[0] } as CreateDocDTO);
		}

		return res.status(500).send({ error: 'db error' });
	} catch (err) {
		console.log(err);
		return res.status(500).send({
			error: 'Something went wrong while creating doc',
		});
	}
};

export const deleteDocsByIds = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		if (!req.body.docIds) {
			return res.status(400).send({
				error: 'missing required parameter(s)',
			});
		}
		const docIds = req.body.docIds;

		// Select all docs with the provided ids
		const docsToDelete = await client.query(
			`SELECT "docRef" FROM docs WHERE "docId" = ANY($1)`,
			[docIds]
		);

		// Delete docs from firebase storage
		const docDeletionPromises = docsToDelete.rows.map(async (doc: any) => {
			const ref = firebaseStorage
				.bucket(process.env.FIREBASE_STORAGE_PATH)
				.file(doc.docRef);
			return ref.delete();
		});

		await Promise.all(docDeletionPromises);

		// Delete docs from database
		await client.query(`DELETE FROM docs WHERE "docId" = ANY($1)`, [docIds]);

		// Return success message
		return res.status(200).send({
			data: {
				successMessage: 'docs successfully deleted!',
			},
		} as DeleteDocsByIdsDTO);
	} catch (err) {
		console.log(err);
		return res.status(500).send({
			error: 'Something went wrong while deleting docs',
		});
	}
};

export const getDocsByUserId = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		if (!req.params.userId) {
			return res.status(400).send({
				error: 'missing required parameter(s)',
			} as ErrorDTO);
		}
		const userId = req.params.userId;
		const result = await client.query(
			`SELECT * FROM docs WHERE "userId" = $1`,
			[userId]
		);
		return res.status(200).send({ data: result.rows } as GetDocsByUserIdDTO);
	} catch (err) {
		console.log(err);
		return res.status(500).send({
			error: 'Something went wrong while fetching docs',
		} as ErrorDTO);
	}
};
