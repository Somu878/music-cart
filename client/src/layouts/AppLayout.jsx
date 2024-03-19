import React from "react";
import styles from "./AppLayout.module.css";
import { Outlet } from "react-router-dom";
function AppLayout() {
  return (
    <div className={styles.appContainer}>
      <div className={styles.header}></div>
      <div>
        <Outlet />
      </div>
      <div className={styles.footer}></div>
    </div>
  );
}

export default AppLayout;
