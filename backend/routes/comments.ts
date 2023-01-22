import express from 'express';
import {
	createComment,
	getCommentsByDocId,
} from './route-helpers/comments-helpers';
const router = express.Router();

router.post('/createComment', createComment);
router.get('/getCommentsByDocId/:docId', getCommentsByDocId);

module.exports = router;
