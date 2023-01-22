import express from 'express';
import {
	createDoc,
	deleteDocsByIds,
	getDocsByUserId,
} from './route-helpers/docs-helpers';
const router = express.Router();

router.post('/createDoc', createDoc);
router.delete('/deleteDocsByIds', deleteDocsByIds);
router.get('/getDocsByUserId/:userId', getDocsByUserId);

module.exports = router;
