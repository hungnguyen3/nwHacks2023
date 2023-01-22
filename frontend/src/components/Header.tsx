import styles from '../styles/HeaderStyle.module.scss';
import { Box, Flex, Avatar, WrapItem, useColorMode } from '@chakra-ui/react';
import Image from 'next/image';
import { useState } from 'react';
import { DarkModeSwitch } from './DarkModeSwitch';

const Header = () => {
	// const [isJobsOpen, setIsJobsOpen] = useState(false);
	// const { colorMode, toggleColorMode } = useColorMode();
	// const isDark = colorMode === 'dark';

	return (
		<Flex
			direction="row"
			align="center"
			justify="space-between"
			className={styles.header}
			backgroundColor={'teal'}
		>
			{/* <DarkModeSwitch /> */}
			<WrapItem className={styles.avatarWapper}>
				<Avatar
					src="https://drive.google.com/uc?export=download&id=1N7023ZtxnWZcpHtqLtaLCYsm1NKWo95x"
					height={70}
					width={70}
					ml={7}
				/>
			</WrapItem>

			<Box className={styles.menu} style={{ fontFamily: 'monospace' }}>
				<ul>
					<li className={styles.jobs}>
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
						<a href="#">Schools</a>
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
			</Box>
			<Box />
		</Flex>
	);
};

export default Header;
