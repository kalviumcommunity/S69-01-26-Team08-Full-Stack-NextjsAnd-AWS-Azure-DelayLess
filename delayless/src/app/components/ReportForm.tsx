"use client";

import { useState } from "react";
import styles from "../styles/report.module.css";

export default function ReportForm() {
  const [issue, setIssue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Report submitted!");
    setIssue("");
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Report a Delay</h2>
        <input
          className={styles.input}
          placeholder="Describe the issue"
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
        />
        <button className={styles.button}>Submit</button>
      </form>
    </div>
  );
}