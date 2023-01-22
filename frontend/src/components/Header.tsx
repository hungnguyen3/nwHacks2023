import styles from '../styles/HeaderStyle.module.scss';
import {
	Box,
	Flex,
	Avatar,
	WrapItem,
	useColorMode,
	Menu,
	MenuButton,
	Button,
	MenuList,
	MenuItem,
	HStack,
	IconButton,
} from '@chakra-ui/react';
import { useState } from 'react';
import { DarkModeSwitch } from './DarkModeSwitch';
import { useAppDispatch } from '../../hooks';
import { logOut } from '../../slices/UserSlice';
import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons';

const Header = () => {
	const [isJobsOpen, setIsJobsOpen] = useState(false);
	const { colorMode, toggleColorMode } = useColorMode();
	const isDark = colorMode === 'dark';
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
	const dispatch = useAppDispatch();

	return (
		<Flex
			direction="row"
			align="center"
			justify="space-between"
			className={styles.header}
			backgroundColor={isDark ? 'whiteAlpha.50' : 'teal'}
		>
			<DarkModeSwitch />
			<WrapItem className={styles.avatarWapper}>
				<a href="#" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
					<Avatar
						src="https://drive.google.com/uc?export=download&id=1N7023ZtxnWZcpHtqLtaLCYsm1NKWo95x"
						height={50}
						width={50}
						maxHeight={50}
						ml={5}
					/>{' '}
				</a>
				{isUserMenuOpen ? (
					<Menu>
						<MenuButton
							as={IconButton}
							aria-label="Options"
							icon={<HamburgerIcon />}
							variant="outline"
						/>
						<MenuList>
							<MenuItem
								onClick={() => dispatch(logOut())}
								className={styles.signOut}
							>
								Sign Out
							</MenuItem>
						</MenuList>
					</Menu>
				) : (
					<div></div>
				)}
			</WrapItem>

			<Box
				className={styles.menu}
				style={{ fontFamily: 'monospace' }}
				paddingRight={70}
			>
				<ul>
					<li>
						<a href="/">Jobs</a>
						<ul>
							<li>
								<a href="/jobs">Roast Piazza</a>
							</li>
							<li>
								<a href="#">job menu 2</a>
							</li>
						</ul>
					</li>
					<li>
						<a href="/">Schools</a>
						<ul>
							<li>
								<a href="/school/Application">Application Info</a>
							</li>
							<li>
								<a href="/school/uniApplications">University Applications</a>
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
