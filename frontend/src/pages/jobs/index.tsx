import Layout from '../../components/Layout';
import styles from '../../styles/JobsStyle.module.scss';

const Jobs = () => {
	return (
		<Layout>
			<div className={styles.container}>
				<div className={styles.squareBox}>
					<div className={styles.resume}>
						Resume
						<p>Your resume content goes here</p>
					</div>
				</div>
				<div className={styles.comment}>
					<div className={styles.commentTitle}>Comment Section</div>
					<div className={styles.list}>
						<ul>
							<li>Comment 1</li>
							<li>Comment 2</li>
							<li>Comment 3</li>
						</ul>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Jobs;
