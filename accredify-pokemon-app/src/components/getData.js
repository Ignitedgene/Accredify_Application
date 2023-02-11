export default class getData {

    async fetchData(fetch){
        let result;
        await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000")
                    .then((res) => res.json())
                    .then((data) => {result = data})
        return result
    }
}
