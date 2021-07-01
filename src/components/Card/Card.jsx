import React from "react";
import styles from "./Card.module.css";
import likeImg from "../../images/like.svg";

const Card = ({ id, isFavorite, setLike, cardImg, nameCharacters, homeworld }) => {

    return (
        <div className={styles.cardWrapper}>
            <div className={styles.cardImg}>
                <img src={cardImg} className={styles.photo} alt="cardImg" />
            </div>
            <div className={styles.bottomPanel}>
                <div className={styles.infoCharacters}>
                    <div className={styles.nameCharacters}>
                        Name: {nameCharacters}
                    </div>
                    <div className={styles.homeworld}>
                        Planet: {homeworld}
                    </div>
                </div>
                <div className={styles.buttonLike}>
                    <button
                        onClick={() =>
                            setLike(id, !isFavorite)
                        }
                        className={styles.button}>
                        <img src={likeImg}
                            className={isFavorite ? styles.nolike : styles.like}
                            alt="like" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card;