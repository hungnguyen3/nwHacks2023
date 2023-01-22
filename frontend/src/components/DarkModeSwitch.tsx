import { useColorMode, IconButton } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

export const DarkModeSwitch = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const isDark = colorMode === 'dark';
	return (
		<IconButton
			position="fixed"
<<<<<<< HEAD
			top={4}
			right={4}
			icon={isDark ? <SunIcon /> : <MoonIcon />}
			aria-label="Toggle Theme"
			colorScheme="orange"
=======
			top={8}
			right={4}
			icon={isDark ? <SunIcon /> : <MoonIcon />}
			aria-label="Toggle Theme"
			colorScheme="green"
>>>>>>> 4a711869aa73ab49ba3a70d434e898c89ccf8fb7
			onClick={toggleColorMode}
		/>
	);
};
