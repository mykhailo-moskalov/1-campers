import Link from "next/link";
import css from "./Header.module.css";
import Image from "next/image";
import Container from "../Container/Container";

const Header = () => {
  return (
    <header className={css.header}>
      <Container className={css.container}>
        <Link className={css.logo} href="/" aria-label="Home">
          <Image src="/logo.svg" alt="Logo" width={136} height={15}></Image>
        </Link>
        <nav aria-label="Main Navigation">
          <ul className={css.nav}>
            <li className={css.navItem}>
              <Link className={css.navLink} href="/">
                Home
              </Link>
            </li>
            <li className={css.navItem}>
              <Link className={css.navLink} href="/catalog">
                Catalog
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
