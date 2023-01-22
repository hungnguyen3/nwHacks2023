import {
	Box,
	Button,
	ButtonGroup,
	Center,
	Text,
	IconButton,
} from '@chakra-ui/react';

export default function Application() {
	var hung = 1;
	var samantha = 2;

	return (
		<Box>
			<Button colorScheme="teal">Button</Button>
			<div />
			<Center>
				<Text style={{ fontSize: '25px' }}>UBC Application</Text>
			</Center>
			<Button colorScheme="teal">Button</Button>
			<div />
		</Box>
	);
}
