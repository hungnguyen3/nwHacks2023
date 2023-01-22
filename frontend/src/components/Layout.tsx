import styles from '../styles/LayoutStyle.module.scss';
import Header from './Header';

interface LayoutProps {
	children: (JSX.Element | null)[] | JSX.Element;
}

const Layout = (props: LayoutProps) => {
	return (
		<div className={styles.background}>
			<div className={styles.pageContainer}>
				<Header />
				<div className={styles.contentContainer}>{props.children}</div>
			</div>
		</div>
	);
};

export default Layout;
