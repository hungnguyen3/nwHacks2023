import styles from '../styles/HeaderStyle.module.scss';
import { Box, Flex, Avatar, WrapItem } from '@chakra-ui/react';
import Image from 'next/image';
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
			<WrapItem className={styles.avatarWapper}>
				<Image
					src="https://drive.google.com/uc?export=download&id=1N7023ZtxnWZcpHtqLtaLCYsm1NKWo95x"
					alt="Avatar"
					height={50}
					width={50}
				/>
			</WrapItem>

			<Box
				onMouseEnter={() => setIsJobsOpen(true)}
				onMouseLeave={() => setIsJobsOpen(false)}
				className={styles.menu}
			>
				<nav>
					<ul>
						<li>
							<a href="#">Jobs</a>
							<ul>
								<li>
									<a href="#">job menu 1</a>
								</li>
								<li>
									<a href="#">job menu 2</a>
								</li>
							</ul>
						</li>
						<li>
							<a href="#">Jobs</a>
							<ul>
								<li>
									<a href="#">job menu 1</a>
								</li>
								<li>
									<a href="#">job menu 2</a>
								</li>
							</ul>
						</li>
					</ul>
				</nav>
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
