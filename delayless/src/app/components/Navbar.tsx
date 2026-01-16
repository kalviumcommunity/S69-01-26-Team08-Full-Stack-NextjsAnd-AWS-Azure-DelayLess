import Link from "next/link";
import styles from "../styles/navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.brand}>🚆 Delayless</div>

      <div className={styles.links}>
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/report">Report</Link>
      </div>
    </nav>
  );
}