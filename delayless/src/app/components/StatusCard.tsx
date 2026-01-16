import styles from "../styles/card.module.css";

type Props = {
  route: string;
  status: string;
  updatedAt: string;
};

export default function StatusCard({ route, status, updatedAt }: Props) {
  return (
    <div className={styles.card}>
      <h3>{route}</h3>
      <p><strong>Status:</strong> {status}</p>
      <p><strong>Updated:</strong> {updatedAt}</p>
    </div>
  );
}