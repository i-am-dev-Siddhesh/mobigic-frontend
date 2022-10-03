import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import SignUpForm from "../Forms/SignUpForm";
import styles from "./index.module.css";
import NextRouter from "next/router";
import NewWindow from "react-new-window";

const SignUpPage = () => {
  const [popup, setPopUp] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      NextRouter.replace("/");
    }
  }, [session]);

  const onLoginwithGoogle = async () => {
    setPopUp(true);

    setTimeout(() => {
      setPopUp(false);
    }, 30000);
  };

  return (
    <div className={styles.parent}>
      <div className={styles.form}>
        <SignUpForm onLoginwithGoogle={onLoginwithGoogle} />
      </div>

      {popup && <NewWindow url="/google-auth-handle" center="parent" />}
    </div>
  );
};

export default SignUpPage;
