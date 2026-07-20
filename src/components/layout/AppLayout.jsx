import { Outlet } from "react-router-dom";
import Header from "./Header";
import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <div className={styles.shell}>
      <Header />
      <main className={styles.main}>
        <div className={styles.content}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
