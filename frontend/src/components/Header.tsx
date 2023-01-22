import styles from '../styles/HeaderStyle.module.scss';
import { Box, Flex, Avatar, WrapItem } from '@chakra-ui/react';
import { useState } from 'react';

const Header = () => {
	const [isJobsOpen, setIsJobsOpen] = useState(false);
	const [isSchoolsOpen, setIsSchoolsOpen] = useState(false);

	return (
		<Flex
			direction="row"
			align="center"
			justify="space-between"
			className={styles.header}
		>
			<WrapItem>
				<Avatar
					size="md"
					className={styles.avatar}
					src="https://drive.google.com/uc?export=download&id=1N7023ZtxnWZcpHtqLtaLCYsm1NKWo95x"
				/>
			</WrapItem>
			<Box
				onMouseEnter={() => setIsJobsOpen(true)}
				onMouseLeave={() => setIsJobsOpen(false)}
				className={styles.jobs}
			>
				Jobs
				{isJobsOpen && <Box>Dropdown List</Box>}
			</Box>
			<Box
				onMouseEnter={() => setIsSchoolsOpen(true)}
				onMouseLeave={() => setIsSchoolsOpen(false)}
				className={styles.schools}
			>
				Schools
				{isSchoolsOpen && <Box>Dropdown List</Box>}
			</Box>
		</Flex>
	);
};

export default Header;
