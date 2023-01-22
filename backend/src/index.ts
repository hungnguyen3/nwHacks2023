import express, { Request, Response } from 'express';
const app = express();

app.get('/', (req: Request, res: Response) => {
	res.send('Hello World!');
});

app.get('/thisIsADifferentRoute', (req: Request, res: Response) => {
	res.send('Hello World from Hung!');
});

app.listen(4000, () => {
	console.log('Server listening on port 3000');
});
