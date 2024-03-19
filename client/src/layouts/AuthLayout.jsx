import React from "react";
import styles from "./Authlayout.module.css";
import { Outlet } from "react-router-dom";
import logo from "../assets/image 4.svg";
function AuthLayout() {
  return (
    <div className={styles.authContainer}>
      <div>
        <div className={styles.header}>
          <div className={styles.logo2}>
            <span>
              <img src={logo} alt="logo" width={"37px"} />
            </span>
            <span>Musicart</span>
          </div>
        </div>
        <div className={styles.logo}>
          <span>
            <img src={logo} alt="logo" width={"37px"} />
          </span>
          <span>Musicart</span>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
      <div className={styles.footer}>Musicart | All rights reserved</div>
    </div>
  );
}

export default AuthLayout;

// const Logo = () => {
//   return (

//       <span>
//         <img src={logo} alt="logo" width={"37px"} />
//       </span>
//       <span>Musicart</span>
//   );
// };
