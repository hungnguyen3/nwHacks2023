import express from 'express';
import {
	createDoc,
	deleteDocsByIds,
	getDocById,
	getDocsByUserId,
} from './route-helpers/docs-helpers';
const router = express.Router();

router.post('/createDoc', createDoc);
router.delete('/deleteDocsByIds', deleteDocsByIds);
router.get('/getDocsByUserId/:userId', getDocsByUserId);
router.get('/getDocById/:docId', getDocById);

module.exports = router;
