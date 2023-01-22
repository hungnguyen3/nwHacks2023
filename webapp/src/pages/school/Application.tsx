import { Box, Button, ButtonGroup, Center, Text } from '@chakra-ui/react';

export default function Application() {
	var hung = 1;
	var samantha = 2;

	return (
		<Box>
			<Button colorScheme="blue">Button</Button>;
			<div />
			<Center>
				<Text style={{ fontSize: '25px' }}>UBC Application</Text>
			</Center>
			<Button colorScheme="blue">Button</Button>;
			<div />;
		</Box>
	);
}
