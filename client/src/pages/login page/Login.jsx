import React from "react";
import styles from "./login.module.css";
import { Link } from "react-router-dom";
function Login() {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.welcomeText}>Welcome</div>
      <form className={styles.formContainer}>
        <div className={styles.title} style={{ fontWeight: "500" }}>
          Sign-in <span className={styles.signInSpan}>Already a user?</span>
        </div>
        <label htmlFor="emailorMobile">Email or Mobile Number</label>
        <input
          type="text"
          name="emailorMobile"
          placeholder="Enter Email or Password"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter password here"
        />
        <button type="submit" className={styles.signInBtn}>
          Continue
        </button>
        <div style={{ fontSize: "0.8rem", marginTop: "10px" }}>
          By continuing, you agree to Musicart privacy notice and conditions of
          use.
        </div>
      </form>
      <div className={styles.break}>New to Musicart?</div>
      <Link to={"/register"}>
        {" "}
        <button className={styles.registerBtn}>
          Create your Musicart account
        </button>
      </Link>
    </div>
  );
}

export default Login;
