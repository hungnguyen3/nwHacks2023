import { CloseIcon } from '@chakra-ui/icons';
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
	Link,
	IconButton,
	Select,
	MenuDivider,
	Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useState } from 'react';
import { DarkModeSwitch } from './DarkModeSwitch';
import { useAppDispatch } from '../../hooks';
import { logOut } from '../../slices/UserSlice';
import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons';
import { googleSignOut } from './FirebaseInit';
import { useRouter } from 'next/router';

const Header = () => {
	const [isJobsOpen, setIsJobsOpen] = useState(false);
	const { colorMode, toggleColorMode } = useColorMode();
	const isDark = colorMode === 'dark';
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
	const dispatch = useAppDispatch();
	const router = useRouter();

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
					<Button
						variant="solid"
						onClick={googleSignOut}
						marginTop={1}
						marginLeft={1}
					>
						Looooooog Ooooooout
					</Button>
				) : (
					<div></div>
				)}
			</WrapItem>

			<Box
				className={styles.menu}
				style={{ fontFamily: 'monospace' }}
				paddingRight={70}
			>
				<Menu autoSelect={false}>
					<MenuButton as={Button} colorScheme="pink" m={8}>
						Jobs
					</MenuButton>
					<MenuList>
						<MenuItem onClick={() => router.push('/jobs')}>
							<NavLink href={'/jobs'}>Roast Piazza</NavLink>
						</MenuItem>
						<MenuItem onClick={() => router.push('/#')}>
							<NavLink href={'/#'}>job menu 2</NavLink>
						</MenuItem>
					</MenuList>
				</Menu>
				<Menu autoSelect={false}>
					<MenuButton as={Button} colorScheme="pink" m={8}>
						School
					</MenuButton>
					<MenuList>
						<MenuItem onClick={() => router.push('/school/Application')}>
							<NavLink href={'/school/Application'}>Application Info</NavLink>
						</MenuItem>
						<MenuItem onClick={() => router.push('/school/uniApplications')}>
							<NavLink href={'/school/uniApplications'}>
								University Applications
							</NavLink>
						</MenuItem>
					</MenuList>
				</Menu>
			</Box>
			<Box />
		</Flex>
	);
};
interface NavLinkProps {
	href: string;
	children: any;
}

const NavLink: React.FC<NavLinkProps> = (props): JSX.Element => {
	return (
		<NextLink href={props.href} passHref>
			<Link
				bg={undefined}
				color={undefined}
				p={2}
				borderRadius="md"
				boxShadow={'lg'}
			>
				{props.children}
			</Link>
		</NextLink>
	);
};

export default Header;
