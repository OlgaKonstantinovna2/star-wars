import React, { useState } from "react";
import styles from "./Card.module.css";
import nolike_img from "../../images/no_like.svg";
import like_img from "../../images/like.svg";

const Card = ({ card_img, name_characters, homeworld }) => {
    const [no_like, setNo_like] = useState(false);
    return (
        <div className={styles.card_wrapper}>
            <div class={styles.card_img}>
                <img src={card_img} className={styles.photo} alt="moon" />
            </div>
            <div className={styles.bottom_panel}>
                <div className={styles.info_characters}>
                    <div className={styles.name_characters}>
                        Имя: {name_characters}
                    </div>
                    <div className={styles.homeworld}>
                        Планета: {homeworld}
                    </div>
                </div>
                <div className={styles.button_like}>
                    <button
                    onClick={() => setNo_like(!no_like)}
                    className={styles.button}>
                    <img src={like_img}
                        className={no_like ? styles.nolike : styles.like}
                        alt="like" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card;