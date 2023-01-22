import styles from '../styles/LayoutStyle.module.scss';

interface LayoutProps {
	children: (JSX.Element | null)[] | JSX.Element;
}

const Layout = (props: LayoutProps) => {
	return (
		<div className={styles.background}>
			<div className={styles.contentContainer}>{props.children}</div>
		</div>
	);
};

export default Layout;
