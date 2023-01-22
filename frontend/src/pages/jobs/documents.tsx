import React, { useState, useEffect, useRef } from 'react';
import Layout from '../../components/Layout';
import styles from '../../styles/JobappsStyle.module.scss';
import {
	Button,
	HStack,
	Select,
	FormControl,
	Center,
	Box,
	Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { createDoc, getDocsByUserId } from '../../../API/docsAPI';
import { useAppSelector } from '../../../hooks';
import { RootState } from '../../../store';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { storage } from '../../components/FirebaseInit';

interface DocDTO {
	docId: number;
	docUrl: string;
	docRef: string;
	docType: string;
	userId: number;
}

const Documents = () => {
	const [selectedOption, setSelectedOption] = useState<DocDTO | null>(null);
	const [options, setOptions] = useState<DocDTO[]>([]);
	const endRef = useRef<HTMLDivElement>(null);
	const router = useRouter();
	const userDbId = useAppSelector((state: RootState) => state.user.userDbId);
	const [file, setFile] = useState(null);

	const scrollToBottom = () => {
		endRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		//fetch the options from the API here
		const fetchOptions = async () => {
			//replace this with actual API call
			await getDocsByUserId(userDbId).then(response => {
				var docs: DocDTO[] = response.data;
				const options = docs;
				setOptions(options);
			});
		};
		fetchOptions();
	}, []);

	const getRoasted = () => {
		router.push(`/jobs/${selectedOption.docId}`);
	};

	const handleDownload = (url: string) => {
		window.open(url, '_blank');
	};

	const handleOnSubmit = async () => {
		if (file) {
			try {
				const docFirebaseRef = `docs/${file.name}${new Date().getTime()}`;
				const storageRef = ref(storage, docFirebaseRef);
				const snapshot = await uploadBytes(storageRef, file);
				const downloadURL = await getDownloadURL(snapshot.ref);

				if (!downloadURL) {
					alert(
						'Failed to save image to firebase therefore failed to create a new giffy 1'
					);
				} else {
					const createDocRes = await createDoc({
						userId: Number(userDbId),
						docUrl: downloadURL,
						docRef: docFirebaseRef,
						docType: 'resume',
					});

					if (createDocRes.error) {
						alert('Something went wrong creating the giffy');
					} else {
						alert('Upload successfully');
					}
				}
			} catch (err) {
				alert('Upload unsuccessfully');
			}
		} else {
			alert('Select a file first');
		}
	};

	const handleOnChange = e => {
		console.log(e.target.files[0]);
		setFile(e.target.files[0]);
	};

	return (
		<Layout>
			<HStack m={20}>
				<FormControl>
					<Select
						width={'200px'}
						placeholder="Select a resume"
						value={selectedOption?.docRef}
						onChange={e => {
							setSelectedOption(
								options.find(option => option.docRef === e.target.value)
							);
							scrollToBottom();
						}}
					>
						{options.map(option => (
							<option key={option.docId} value={option.docRef}>
								{option.docRef}
							</option>
						))}
					</Select>
				</FormControl>
				<input type="file" accept="application/pdf" onChange={handleOnChange} />
				<Button onSubmit={handleOnSubmit} color={'orange'} type="submit">
					Upload File
				</Button>
			</HStack>
			<Center>
				<HStack>
					{selectedOption ? (
						<Button
							onClick={async () => {
								handleDownload(selectedOption?.docUrl);
							}}
							colorScheme="teal"
							size="lg"
							width="150px"
							height="100px"
						>
							{'Download'}
						</Button>
					) : null}
					<div className={styles.squareBox}>
						<Center>
							<Text>{selectedOption ? null : 'No resume selected'}</Text>
						</Center>
						<object
							data={selectedOption?.docUrl}
							width="100%"
							height="100%"
						></object>
					</div>
					{selectedOption ? (
						<Button
							onClick={getRoasted}
							colorScheme="teal"
							size="lg"
							width="150px"
							height="100px"
						>
							{'Get Roasted🔥!'}
						</Button>
					) : null}
				</HStack>
			</Center>
			<div ref={endRef} />
		</Layout>
	);
};

export default Documents;
