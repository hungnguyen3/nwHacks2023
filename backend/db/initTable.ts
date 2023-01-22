import { client } from '../src/index';

export const initTables = async () => {
	await initUsers();
	await initDocs();
	await initComments();
};

const initUsers = async () => {
	await client
		.query(
			`
        CREATE TABLE IF NOT EXISTS users (
          "userId" SERIAL PRIMARY KEY,
          "userName" varchar(255) NOT NULL,
          "firebaseAuthId" varchar(255) NOT NULL,
          "profileImgUrl" varchar(255)
        );
      `
		)
		.then(() => console.log('successfully created users table'))
		.catch((e: any) => console.error(e.stack));
};

const initDocs = async () => {
	await client
		.query(
			`
        DO $$ BEGIN
        CREATE TYPE doc_t AS ENUM('resume', 'coverletter', 'others');
        EXCEPTION
          WHEN duplicate_object THEN null;
        END $$;

        CREATE TABLE IF NOT EXISTS docs (
          "docId" SERIAL PRIMARY KEY,
          "docUrl" varchar(255) NOT NULL,
          "docRef" varchar(255) NOT NULL,
          "docType" doc_t NOT NULL,
          "userId" int NOT NULL,

          FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE CASCADE 
        );
      `
		)
		.then(() => console.log('successfully created docs table'))
		.catch((e: any) => console.error(e.stack));
};

const initComments = async () => {
	await client
		.query(
			`
        CREATE TABLE IF NOT EXISTS comments (
          "commentId" SERIAL PRIMARY KEY,
          "text" varchar(255) NOT NULL,
          "docId" int NOT NULL,

          FOREIGN KEY ("docId") REFERENCES "docs"("docId") ON DELETE CASCADE 
        );
      `
		)
		.then(() => console.log('successfully created comments table'))
		.catch((e: any) => console.error(e.stack));
};
