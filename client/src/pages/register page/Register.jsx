import React from "react";
import styles from "./register.module.css";
function Register() {
  return (
    <div className={styles.registerContainer}>
      <div className={styles.welcomeText}>Welcome</div>
      <form className={styles.formContainer}>
        <div className={styles.title}>
          Create an account.{" "}
          <span style={{ fontSize: "0.9rem", fontWeight: "400" }}>
            Don't have an account?
          </span>
        </div>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" placeholder="Enter username" />
        <label htmlFor="mobile">Mobile number</label>
        <input type="text" name="mobile" placeholder="Enter mobile number" />
        <label htmlFor="Email">Email</label>
        <input type="email" placeholder="Enter email" />
        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Enter password" />
        <div
          style={{ fontSize: "0.7rem", fontWeight: "500", marginTop: "5px" }}
        >
          By enrolling your mobile phone number, you consent to receive
          automated security notifications via text message from Musicart.
          Message and data rates may apply.
        </div>
        <button className={styles.submitBtn} type="submit">
          Continue
        </button>
        <div style={{ fontSize: "0.8rem", marginTop: "5px" }}>
          By continuing, you agree to Musicart privacy notice and conditions of
          use.
        </div>
      </form>

      <div>
        Already have an account? <a href="/login">Sign in</a>
      </div>
    </div>
  );
}

export default Register;
