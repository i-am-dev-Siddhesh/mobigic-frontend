import { CustomButton } from "@/src/core/Button/Button";
import { signOut, useSession } from "next-auth/react";
import styles from "./navbar.module.css";

const Navbar = () => {
  const { data: session } = useSession();
  
  const handleLogout = () => {
    signOut();
  };

  return (
    <div className={styles.root}>
      <h1>Welcome {session?.user?.name}</h1>

      <CustomButton
        isSubmitting={false}
        type="submit"
        label={`Log out`}
        iconPosition="right"
        style={{ background: "white", color: "black" }}
        onClick={handleLogout}
      />
    </div>
  );
};

export default Navbar;
