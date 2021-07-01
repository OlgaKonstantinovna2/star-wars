import React from "react";
import styles from "./Card.module.css";
import like_img from "../../images/like.svg";

const Card = ({ id, isFavorite, setLike, card_img, name_characters, homeworld }) => {

    return (
        <div className={styles.card_wrapper}>
            <div className={styles.card_img}>
                <img src={card_img} className={styles.photo} alt="cardImg" />
            </div>
            <div className={styles.bottom_panel}>
                <div className={styles.info_characters}>
                    <div className={styles.name_characters}>
                        Name: {name_characters}
                    </div>
                    <div className={styles.homeworld}>
                        Planet: {homeworld}
                    </div>
                </div>
                <div className={styles.button_like}>
                    <button
                        onClick={() =>
                            setLike(id, !isFavorite)
                        }
                        className={styles.button}>
                        <img src={like_img}
                            className={isFavorite ? styles.nolike : styles.like}
                            alt="like" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card;