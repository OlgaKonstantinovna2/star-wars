import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import request from "../../request";
import styles from "./FavCharacters.module.css";

const FavCharacters = () => {
    const [data, setData] = useState(null)
    const [favorites, setfavorites] = useState(
        JSON.parse(localStorage.getItem("favorite")) || []
    )

    useEffect(() => {
        init(1)
    }, [])

    const init = async (index = 1) => {
        const favoritesArr = JSON.parse(localStorage.getItem("favorite")) || []
        const tmp = []
        for (let i = 0; i < favoritesArr.length; i++) {
            const f = await request.get(`people/${favoritesArr[i]}`)
            if (f) {
                tmp.push({
                    ...f,
                    image: `https://starwars-visualguide.com/assets/img/characters/${favoritesArr[i]}.jpg`,
                    id: favoritesArr[i]
                }
                )
            }
        }
        setData(tmp)
    }

    const setLike = (e, isLike) => {
        console.log('setLike Func')
        const tmp = JSON.parse(localStorage.getItem("favorite")) || []
        if (isLike) {
            tmp.push(e)
        } else {
            tmp.splice(tmp.indexOf(e), 1)
        }
        localStorage.setItem("favorite", JSON.stringify(tmp))
        setfavorites(tmp)
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                Любимые герои
            </div>
            <div className={styles.cards_wrapper}>
                {
                    data && (
                        data.map((item, index) =>
                            <div key={`character_${index}`} className={styles.card_wrapper}>
                                <Card
                                    id={item.id}
                                    isFavorite={favorites.indexOf(item.id) !== -1}
                                    setLike={setLike}
                                    name_characters={item.name}
                                    // homeworld={data.results.name}
                                    card_img={item.image}
                                />
                            </div>
                        )
                    )
                }
            </div>
        </div>
    )
}

export default FavCharacters;