
const get = async (api) => {
    const f = await fetch("https://swapi.dev/api/" + api)
    const json = await f.json()
    return json
}

export default {
    get
}