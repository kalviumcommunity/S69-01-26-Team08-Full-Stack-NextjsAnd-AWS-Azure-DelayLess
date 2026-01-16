import styles from "../styles/loader.module.css";

export default function TrainLoader() {
  return (
    <div className={styles.container}>
      <div className={styles.track}>
        <div className={styles.train}>🚆</div>
      </div>
    </div>
  );
}