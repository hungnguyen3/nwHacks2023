import {
	Box,
	Flex,
	Input,
	Select,
	Stack,
	HStack,
	Text,
	useColorModeValue,
	Image,
	Center,
} from '@chakra-ui/react';
import { useState } from 'react';
import Layout from '../../components/Layout';

interface University {
	id: number;
	name: string;
	type: 'Public' | 'Private';
	photoUrl: string;
}

const universities: University[] = [
	{
		id: 1,
		name: 'UBC',
		type: 'Public',
		photoUrl:
			'https://www.treehousemedia.ca/th/wp-content/uploads/2019/01/ubc-logo.png',
	},
	{
		id: 2,
		name: 'McGill',
		type: 'Private',
		photoUrl:
			'https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/0005/0965/brand.gif?itok=2YFSxjc4',
	},
	{
		id: 3,
		name: 'SFU',
		type: 'Private',
		photoUrl:
			'https://www.sfu.ca/content/sfu/communicators-toolkit/guides/brand-guide/logos/Institutional/jcr:content/main_content/image_1965659656.img.640.medium.png/1624475554595.png',
	},
	{
		id: 4,
		name: 'UofT',
		type: 'Private',
		photoUrl:
			'https://download.logo.wine/logo/University_of_Toronto/University_of_Toronto-Logo.wine.png',
	},
];

export default function UniversitySearch() {
	const bg = useColorModeValue('white', 'gray.700');
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedOption, setSelectedOption] = useState<
		'All' | 'Public' | 'Private'
	>('All');

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedOption(e.target.value as 'All' | 'Public' | 'Private');
	};

	const filteredUniversities = universities.filter(university => {
		if (selectedOption === 'All') {
			return university.name.toLowerCase().includes(searchTerm.toLowerCase());
		} else {
			return (
				university.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
				university.type === selectedOption
			);
		}
	});

	return (
		<Layout>
			<Box
				bg={bg}
				p={4}
				display="flow"
				ml={'5%'}
				mt={'3%'}
				width="95vw"
				height="85vh"
				alignItems="center top"
				justifyContent="center"
			>
				<Flex justify="center">
					<Stack spacing={10}>
						<Center>
							<Text fontWeight="bold" style={{ fontSize: '25px' }}>
								Find your University
							</Text>
						</Center>
						<Center>
							<Input
								style={{ fontSize: '25px' }}
								placeholder="Search Universities"
								value={searchTerm}
								onChange={handleSearch}
							/>
						</Center>
						<Center>
							<Select
								style={{ fontSize: '20px', width: '100%' }}
								value={selectedOption}
								onChange={handleSelect}
							>
								<option value="All">All</option>
								<option value="Public">Public</option>
								<option value="Private">Private</option>
							</Select>
						</Center>
					</Stack>
				</Flex>
				<Center>
					<HStack spacing={100} justify="center" overflow="auto">
						{filteredUniversities.map(university => (
							<Box key={university.id}>
								<Text>{university.name}</Text>
								<Text>{university.type}</Text>
								<Box boxSize="sm" alignItems={'center'}>
									<Image src={university.photoUrl} alt={university.name} />
								</Box>
							</Box>
						))}
					</HStack>
				</Center>
			</Box>
		</Layout>
	);
}
