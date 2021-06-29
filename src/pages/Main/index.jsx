import React, { useEffect, useState } from "react";
import styles from "./Main.module.css";
import Card from "../../components/Card/Card";
import IvanShumkov from "../../images/hero.jpg";
import request from "../../request";

const Main = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        init(1)
    }, [])

    const init = async (index = 1) => {
        const data = await request.get(`people/?page=${index}`)
        if (data.results) {
            setData(
                data.results.map((item, itemIndex) => ({
                    ...item,
                    image: `https://starwars-visualguide.com/assets/img/characters/${index === 1 ? ((index - 1) * 10 + (itemIndex + 1)) : ((index - 1) * 10 + (itemIndex + 2))
                        }.jpg`
                }))
            )
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.cards_wrapper}>
                {
                    data && (
                        data.map((item, index) =>
                            <div key={`character_${index}`} className={styles.card_wrapper}>
                                <Card
                                    name_characters={item.name}
                                    // homeworld={data.results.name}
                                    card_img={item.image}
                                />
                            </div>
                        )
                    )
                }
            </div>
            <div className={styles.buttons}>
                {
                    data && (
                        (new Array(9)).fill(1).map((a, index) =>
                            <button
                                className={styles.button}
                                key={`page_${index}`}
                                onClick={() => init(index + 1)}
                            >{index + 1}</button>
                        )
                    )
                }
            </div>
        </div>
    )
}

export default Main;