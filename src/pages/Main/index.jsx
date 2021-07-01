import React, { useEffect, useState } from "react";
import styles from "./Main.module.css";
import Card from "../../components/Card/Card";
import request from "../../request";
import searchImage from "../../images/search.svg";
import resetImg from "../../images/reset.svg";

const Main = () => {
    const [data, setData] = useState(null);
    const [searchQuery, setSearchQuery] = useState(false);
    const [searchData, setSearchData] = useState(null);
    const [valueSearch, setValueSearch] = useState("");
    const [indexBtn, setIndexBtn] = useState(0);
    const [favorites, setFavorites] = useState(
        JSON.parse(localStorage.getItem("favorite")) || []
    )

    useEffect(() => {
        init(1)
    }, [])

    const init = async (index = 1) => {
        const data = await request.get(`people/?page=${index}`)
        if (data.results) {
            setData(
                data.results.map((item, itemIndex) => ({
                    ...item,
                    image: `https://starwars-visualguide.com/assets/img/characters/${(index - 1) * 10 + (itemIndex + 1)
                        }.jpg`,
                    id: index === 1 ? ((index - 1) * 10 + (itemIndex + 1)) : ((index - 1) * 10 + (itemIndex + 2))
                }))
            )
        }
    }

    const searchCharacters = async (name) => {
        const search = await request.get(`people/?search=${name}`)
        if (search.results) {
            setSearchData(
                search.results.map((item) => ({
                    ...item,
                    image: `https://starwars-visualguide.com/assets/img/characters/${numFromStr(item.url)}.jpg`
                }))
            )
        }
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
        setFavorites(tmp)
    }

    function numFromStr(str) {
        return [...str]
            .map(i => { if (isFinite(i) === true) { return i } else { return " " } })
            .join("")
            .split(" ")
            .filter(i => i !== "")
            .map(i => Number(i))
    }

    return (
        <div className={styles.wrapper}>
            {
                searchQuery ? (
                    <div className={styles.cardsWrapper}>
                        {
                            searchData && (
                                searchData.map((item, index) =>
                                    <div key={`character_${index}`} className={styles.cardWrapper}>
                                        <Card
                                            id={item.id}
                                            isFavorite={favorites.indexOf(item.id) !== -1}
                                            setLike={setLike}
                                            nameCharacters={item.name}
                                            // homeworld={data.results.name}
                                            cardImg={item.image}
                                        />
                                    </div>
                                )
                            )
                        }
                    </div>
                ) : (
                    <div className={styles.cardsWrapper}>
                        {
                            data && (
                                data.map((item, index) =>
                                    <div key={`character_${index}`} className={styles.cardWrapper}>
                                        <Card
                                            id={item.id}
                                            isFavorite={favorites.indexOf(item.id) !== -1}
                                            setLike={setLike}
                                            nameCharacters={item.name}
                                            // homeworld={data.results.name}
                                            cardImg={item.image}
                                        />
                                    </div>
                                )
                            )
                        }
                    </div>
                )
            }
            <div className={styles.searchWrapper}>
                <button
                    disabled={!searchQuery}
                    onClick={() => {
                        setSearchQuery(false)
                    }}
                    className={styles.searchBtn}>
                    <img className={styles.resetImg} src={resetImg} alt='reset' />
                </button>
                <div className={styles.input}>
                    <div className={styles.group}>
                        <input value={valueSearch} onChange={(event) => setValueSearch(event.target.value)} type="text" id="name" required="required" />
                        <label>Search</label>
                        <div className={styles.bar}></div>
                    </div>
                </div>
                <button
                    onClick={() => {
                        setSearchQuery(true)
                        searchCharacters(valueSearch)
                    }}
                    className={styles.searchBtn}>
                    <img className={styles.searchImg} src={searchImage} alt='search' />
                </button>
            </div>
            <div className={styles.buttons}>
                {
                    !searchData && data && (
                        (new Array(9)).fill(1).map((a, index) =>
                            <button
                                className={`${styles.button} ${indexBtn === index && styles.activeButton}`}
                                key={`page_${index}`}
                                onClick={() => {
                                    init(index + 1)
                                    setIndexBtn(index)
                                }}
                            >{index + 1}</button>
                        )
                    )
                }
            </div>
        </div>
    )
}

export default Main;