import styles from "./page.module.css";
import { SearchUsers } from "./search-users";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <SearchUsers />
      </main>
    </div>
  );
}
