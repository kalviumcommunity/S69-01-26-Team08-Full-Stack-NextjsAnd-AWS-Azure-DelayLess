"use client";

import { useEffect, useState } from "react";
import StatusCard from "../components/StatusCard";
import TrainLoader from "../components/TrainLoader";
import styles from "../styles/dashboard.module.css";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  if (loading) {
    return <TrainLoader />;
  }

  const data = [
    {
      route: "Electronic City → Central",
      status: "Delayed by 10 minutes",
      updatedAt: "2 mins ago",
    },
    {
      route: "Whitefield → Majestic",
      status: "On Time",
      updatedAt: "Just now",
    },
  ];

  return (
    <main className={styles.container}>
      <h2 className={styles.title}>Live Status</h2>
      {data.map((item, index) => (
        <StatusCard key={index} {...item} />
      ))}
    </main>
  );
}