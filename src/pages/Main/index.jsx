import React, { useEffect, useState } from "react";
import styles from "./Main.module.css";
import Card from "../../components/Card/Card";
import request from "../../request";
import searchImage from "../../images/search.svg";

const Main = () => {
    const [data, setData] = useState(null);
    const [search, setSearch] = useState(null);
    // const [searchImg, setSearchImg] = useState(null);
    const [valueSearch, setValueSearch] = useState("");

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

    const Search = async (name) => {
        const search = await request.get(`people/?search=${name}`)
        if (search.results) {
            setSearch(
                search.results.map((item) => ({
                    ...item,
                    image: `https://starwars-visualguide.com/assets/img/characters/${numFromStr(item.url)}.jpg`
                }))
            )
        }
    }

    function numFromStr(str) {
        return [...str]
            .map(i => { if (isFinite(i) == true) { return i } else { return " " } })
            .join("")
            .split(" ")
            .filter(i => i != "")
            .map(i => Number(i))
    }

    //  let a = numFromStr(item.url)
    //  console.log(a)

    return (
        <div className={styles.wrapper}>
            {
                valueSearch ? (
                    <div className={styles.cards_wrapper}>
                        {
                            search && (
                                search.map((item, index) =>
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
                ) : (
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
                )
            }
            <div className={styles.top_panel}>
                <div className={styles.search_wrapper}>
                    <div className={styles.input}>
                        <input
                            onChange={(event) => setValueSearch(event.target.value)}
                            value={valueSearch}
                            className={styles.input_native}
                            type="text"
                            placeholder="Поиск"
                        />
                    </div>
                    <button
                        onClick={() => {
                            Search(valueSearch)
                        }}
                        className={styles.search_btn}>
                        <img className={styles.search_img} src={searchImage} alt='search' />
                    </button>
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
        </div>
    )
}

export default Main;