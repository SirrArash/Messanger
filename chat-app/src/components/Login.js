import React from "react";
import firebase from "firebase/app";
import { auth } from "../firebase";

//Icons
import google from "../assets/google.svg";

//Styles
import styles from "./Login.module.css";

const Login = () => {
  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <h2>
          Welcome to <span></span>
          <span className={styles.A}>A</span>
          <span className={styles.r}>r</span>
          <span className={styles.a}>a</span>
          <span className={styles.s}>s</span>
          <span className={styles.h}>h</span>gram!
        </h2>
        <div
          className={styles.button}
          onClick={() =>auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())} 
        >
          <img src={google} alt="google" /> <span>Sign in with Google</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
