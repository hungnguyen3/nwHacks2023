import { Box, Center } from '@chakra-ui/react';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import ReactMarkdown from 'react-markdown';
import Layout from '../components/Layout';

export default function Home() {
	let markdown: string = '- this app is gud';

	return (
		<Layout>
			<div>
				{' '}
				<Center
					width="100vw"
					height="100vh"
					alignItems="center"
					justifyContent="center"
				>
					<Box
						p={5}
						borderWidth="1px"
						rounded="lg"
						color="tomato"
						bg="white"
						borderColor="tomato"
						textColor="black"
					>
						<ReactMarkdown
							components={ChakraUIRenderer()}
							children={markdown}
							skipHtml
						/>
					</Box>
				</Center>
			</div>
		</Layout>
	);
}
