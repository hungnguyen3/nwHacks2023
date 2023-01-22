import {
	Box,
	Button,
	ButtonGroup,
	Center,
	Text,
	IconButton,
} from '@chakra-ui/react';
import { GrAdd } from 'react-icons/gr';
import { HiShare } from 'react-icons/hi';
import Layout from '../../components/Layout';

export default function Application() {
	var hung = 1;
	var samantha = 2;

	return (
		<Layout>
			<Center>
				<Text style={{ fontSize: '25px' }}>UBC Application</Text>
			</Center>
			<IconButton
				aria-label="Share application"
				rounded="full"
				size="lg"
				position="absolute"
				right={4}
				bottom={20}
				onClick={() => {}}
				icon={<HiShare />}
			></IconButton>
			<IconButton
				aria-label="Add new stuff"
				rounded="full"
				size="lg"
				position="absolute"
				right={4}
				bottom={4}
				onClick={() => {}}
				icon={<GrAdd />}
			></IconButton>
		</Layout>
	);
}
