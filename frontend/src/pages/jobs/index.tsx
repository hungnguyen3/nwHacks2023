import Layout from "../../components/Layout";
import styles from "../../styles/JobsStyle.module.scss";

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
        <div className={styles.squareBox}>
          <div className={styles.resume}>
            Another Resume
            <p>Your another resume content goes here</p>
          </div>
        </div>
        <div className={styles.comment}>
          <div className={styles.commentTitle}>Comment Section 1</div>
          <div className={styles.list}>
            <ul>
              <li>Comment 1</li>
              <li>Comment 2</li>
              <li>Comment 3</li>
              <li>Comment 4</li>
              <li>Comment 5</li>
              <li>Comment 6</li>
              <li>Comment 7</li>
            </ul>
          </div>
        </div>
        <div className={styles.comment2}>
          <div className={styles.commentTitle2}>Comment Section 2</div>
          <div className={styles.list}>
            <ul>
              <li>Comment 8</li>
              <li>Comment 9</li>
              <li>Comment 10</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Jobs;
