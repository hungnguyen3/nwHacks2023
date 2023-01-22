import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getDocById } from '../../../API/docsAPI';
import Layout from '../../components/Layout';
import styles from '../../styles/JobsStyle.module.scss';
import { DocDTO } from './documents';

const Jobs = () => {
	const router = useRouter();
	const { docId } = router.query;
	const [doc, setDoc] = useState<DocDTO | null>(null);

	useEffect(() => {
		console.log(doc);

		//fetch the options from the API here
		const fetchDoc = async () => {
			//replace this with actual API call
			await getDocById(Number(docId)).then(response => {
				var theDoc: DocDTO = response.data;
				setDoc(theDoc);
			});
		};

		fetchDoc();
	}, [docId]);

	return (
		<Layout>
			<div className={styles.container}>
				<div className={styles.squareBox}>
					<div className={styles.resume}>
						<object data={doc?.docUrl} width="100%" height="100%"></object>
					</div>
				</div>
				<CommentsSection docIdProp={docId} />
			</div>
		</Layout>
	);
};

import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	Text,
	Textarea,
} from '@chakra-ui/react';
import { createComment, getCommentsByDocId } from '../../../API/commentsAPI';

interface Comment {
	text: string;
	docId: number;
}

const CommentsSection = docIdProp => {
	const [comments, setComments] = useState<Comment[]>([]);
	const router = useRouter();
	const { docId } = router.query;
	const [finalDocId, setFinalDocId] = useState<number | null>(null);

	useEffect(() => {
		const getDocComments = async () => {
			await getCommentsByDocId(finalDocId).then(response => {
				console.log(response);
				if (!response.error) {
					setComments(response.data);
				}
			});
		};
		setFinalDocId(Number(docId));

		getDocComments();
	}, [docId, finalDocId]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const newComment: Comment = {
			text: e.currentTarget.comment.value,
			docId: Number(finalDocId),
		};

		await createComment(newComment);
		setComments([...comments, newComment]);
	};

	return (
		<Box ml={50} mt={50}>
			<form onSubmit={handleSubmit}>
				<FormControl>
					<FormLabel>
						<h4>Add a comment:</h4>
					</FormLabel>
					<Textarea name="comment" id="comment" />
					<Input type="hidden" name="docId" value={docIdProp} />
					<Button mt={8} color={'orange'} type="submit">
						Add comment
					</Button>
				</FormControl>
			</form>
			<Box>
				{comments.map(comment => (
					<Box key={comment.docId} mt={8}>
						<p>{comment.text}</p>
					</Box>
				))}
			</Box>
		</Box>
	);
};

export default Jobs;
