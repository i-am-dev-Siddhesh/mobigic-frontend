import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import SignUpForm from "../Forms/SignUpForm";
import styles from "./index.module.css";
import NextRouter from "next/router";
 
const SignUpPage = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      NextRouter.replace("/");
    }
  }, [session]);

  return (
    <div className={styles.parent}>
      <div className={styles.form}>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
