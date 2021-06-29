import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../images/logo.png";

const Header = () => {
    return (
        <section className={styles.header}>
            <div className={styles.wrapper}>
                <div className={styles.logo_wrapper}>
                    <Link to='/'>
                        <img className={styles.logo_img} src={logo} alt='logo' />
                    </Link>
                </div>
                <div className={styles.links_navigation}>
                    <Link className={styles.link} to='/'>Главная</Link>
                    <Link className={styles.link} to='/FavCharacters'>Любимые герои</Link>
                </div>
            </div>
        </section>
    )
}

export default Header;