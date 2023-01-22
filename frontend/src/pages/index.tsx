import { Box, Center } from '@chakra-ui/react';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import ReactMarkdown from 'react-markdown';
import Layout from '../components/Layout';

export default function Home() {
	let markdown: string = `# Resume Roaster 🔥📝
	\n##### The ultimate platform for showcasing your professional skills and receiving constructive feedback from your peers.
	\n#### Our app lets you:
	\n- Share your resume with the community 📝
	\n- Get feedback on how to improve your resume 🔍
	\n- Roast other people's resumes for a good laugh 😂
	\n- Use helpful resume templates 📋
	\n- Auto-fill school applications for high school graduates 🎓
	\n#####  We're more than just a fun platform, we believe in the power of community and supporting each other in our job search journey. 
	\n##### That's why our platform offers personalized resume critiques and a supportive community of professionals to help you take your career to the next level. 🤝
	\n##### But we don't stop there, we also want to make the college application process easier for high school graduates. 
	\n##### That's why we have a feature to auto-fill school applications, making the process smoother and less stressful. 🎓
	\n &nbsp;
	\n##### So why wait? Sign up now and start showcasing your skills, receiving feedback, roasting others and acheiving your dreams. 🙌
	\n**Note**: The above-mentioned features are not implemented yet and it's a bluff.`;

	return (
		<Layout>
			<Center
				ml={'5%'}
				mt={'3%'}
				width="75vw"
				height="85vh"
				alignItems="center top"
				justifyContent="center"
			>
				<Box
					p={5}
					borderWidth="11px"
					rounded="37px"
					color="tomato"
					bg="white"
					borderColor="tomato"
					textColor="black"
					overflow={'auto'}
					m={7}
				>
					<ReactMarkdown
						components={ChakraUIRenderer()}
						children={markdown}
						skipHtml
					/>
				</Box>
			</Center>
		</Layout>
	);
}
