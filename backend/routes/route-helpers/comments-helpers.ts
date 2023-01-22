import { client } from '../../src/index';
import express from 'express';

export const getCommentsByDocId = async (
	req: express.Request,
	res: express.Response
) => {
	const docId = req.params.docId;

	try {
		const getCommentsByDocIdRes = await client.query(
			`SELECT * FROM comments WHERE "docId" = $1`,
			[docId]
		);

		console.log(getCommentsByDocIdRes);
		if (getCommentsByDocIdRes.rowCount > 0) {
			return res.status(200).send({ data: getCommentsByDocIdRes.rows });
		}

		return res.status(404).send({ error: 'comments not found' });
	} catch (err) {
		console.log(err);
		return res.status(500).send({
			error: 'Something went wrong while getting comments by docId',
		});
	}
};

export const createComment = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		if (!(req.body.text && req.body.docId)) {
			return res.status(400).send({
				error: 'missing required parameter(s)',
			});
		}
		const createCommentRes = await client.query(
			`INSERT INTO comments ("text", "docId") VALUES ($1, $2) RETURNING *;`,
			[req.body.text, req.body.docId]
		);

		if (createCommentRes.rowCount === 1) {
			return res.status(200).send({ data: createCommentRes.rows[0] });
		}

		return res.status(500).send({ error: 'db error' });
	} catch (err) {
		console.log(err);
		return res.status(500).send({
			error: 'Something went wrong while creating a comment',
		});
	}
};
