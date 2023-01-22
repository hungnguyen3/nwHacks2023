import express from 'express';
import bodyParser from 'body-parser';
const { Client } = require('pg');
import { initTables } from '../db/initTable';
const userRoute = require('../routes/users');
const docRoute = require('../routes/docs');
import cors from 'cors';
require('dotenv').config();

const admin = require('firebase-admin');

// admin.initializeApp({
// 	credential: admin.credential.cert({
// 		type: process.env.FIREBASE_TYPE,
// 		project_id: process.env.FIREBASE_PROJECT_ID,
// 		private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
// 		private_key: process.env.FIREBASE_PRIVATE_KEY,
// 		client_email: process.env.FIREBASE_CLIENT_EMAIL,
// 		client_id: process.env.FIREBASE_CLIENT_ID,
// 		auth_uri: process.env.FIREBASE_AUTH_URI,
// 		token_uri: process.env.FIREBASE_TOKEN_URI,
// 		auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER,
// 		client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT,
// 	}),
// });

admin.initializeApp({
	credential: admin.credential.cert({
		project_id: process.env.FIREBASE_PROJECT_ID,
		private_key: process.env.FIREBASE_PRIVATE_KEY,
		client_email: process.env.FIREBASE_CLIENT_EMAIL,
	}),
});

export const firebaseStorage = admin.storage();

export const client = new Client({
	connectionString: process.env.PG_CONNECTION_URL,
});

(async () => {
	const app = express();

	// enable this if you run behind a proxy (e.g. nginx)
	app.set('trust proxy', 1);

	// cors;
	var whitelist;
	if ((process.env.PROD as string) !== 'true') {
		whitelist = 'http://localhost:3000';
	} else {
		whitelist = process.env.CORS_ORIGIN!;
	}

	app.use(
		cors({
			origin: whitelist,
			credentials: true,
			methods: ['GET', 'POST', 'DELETE'],
		})
	);

	// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: false }));
	// parse application/json
	app.use(bodyParser.json());

	client.connect((err: any) => {
		if (err) {
			console.error('postgres connection error', err.stack);
		} else {
			console.log('connected to postgres server');
		}
	});

	await initTables();

	app.use('/users', userRoute);
	app.use('/docs', docRoute);

	app.listen(4000, () => {
		console.log('server running on port 4000');
	});
})();
