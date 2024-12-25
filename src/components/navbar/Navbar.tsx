import Link from "next/link";
import styles from "./Navbar.module.css";
import CreateLobbyButton from "@/components/navbar/createlobbybutton";
import JoinLobbyButton from "@/components/navbar/joinlobbybutton";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">echo.gg</Link>
      </div>
      <div className={styles.buttons}>
        <JoinLobbyButton className={styles.button} />
        <CreateLobbyButton className={styles.button} />
      </div>
    </nav>
  );
};

export default Navbar;