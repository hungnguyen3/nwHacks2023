import Layout from '../components/Layout';
import { DarkModeSwitch } from '../components/DarkModeSwitch';

export default function Home() {
	return (
		<div>
			hello world
			<Layout>
				<DarkModeSwitch />
				<div>empty rn.</div>
				<div>empty rn.</div>
				<div>empty rn.</div>
			</Layout>
		</div>
	);
}