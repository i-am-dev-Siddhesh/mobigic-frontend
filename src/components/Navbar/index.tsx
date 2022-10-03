import { useSession } from "next-auth/react";
import styles from "./navbar.module.css";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div className={styles.root}>
      <h1>Welcome {session?.user?.name}</h1>
    </div>
  );
};

export default Navbar;
