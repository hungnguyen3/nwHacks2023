import React, { MouseEvent } from 'react';
import Layout from '../../components/Layout';
import styles from '../../styles/JobappsStyle.module.scss';
import { Button, HStack } from '@chakra-ui/react';

const ResumeTemplates = () => {
	const handleMouseEvent = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		// Do something
		alert('go');
	};
	return (
		<Layout>
			<div className={styles.container}>
				<HStack>
					<Button
						onClick={handleMouseEvent}
						colorScheme="teal"
						size="lg"
						width="150px"
						height="100px"
					>
						{'<'}
					</Button>
					<div className={styles.squareBox}>
						<div className={styles.resume}>
							Resume
							<p>Your resume content goes here</p>
						</div>
					</div>
					<Button
						onClick={handleMouseEvent}
						colorScheme="teal"
						size="lg"
						width="150px"
						height="100px"
					>
						{'>'}
					</Button>
				</HStack>
			</div>
		</Layout>
	);
};

export default ResumeTemplates;
