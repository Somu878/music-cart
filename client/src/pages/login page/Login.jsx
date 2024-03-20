import React from "react";
import styles from "./login.module.css";
function Login() {
  return (
    <div className={styles.loginContainer}>
      <form className={styles.formContainer}>
        <div className={styles.title} style={{ fontWeight: "500" }}>
          Sign-in <span className={styles.signInSpan}>Already a User?</span>
        </div>
        <label htmlFor="emailorMobile">Enter your email or mobile</label>
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
        <button type="submit">Signin</button>
        <br />
        <span>
          By continuing, you agree to Musicart privacy notice and conditions of
          use.
        </span>
      </form>

      <button>Create your musicart account</button>
    </div>
  );
}

export default Login;
