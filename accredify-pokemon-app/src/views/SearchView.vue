<template>
  <div>

  <!-- SEARCH FORM  -->
  <div class="bg-orange-300 bg-opacity-75 border-2 p-3 mx-4">
    <form class="text-center select-none" >
      <h1 class="text-2xl font-semibold mb-2">{{ title }}</h1>
      <input
        type="text"
        v-model="text"
        placeholder="Enter a Pokemon"
        class="border-2 mx-2 px-2"
      />
    </form>
  </div>

  <!-- SEARCH SUGGESTIONS -->
  <div class="p-4 flex flex-wrap justify-center">
    <div class="text-gray-700 text-opacity-60 font-normal px-2"
      v-for="(pokemon, idx) in filteredPokemons"
      :key="idx"
    >
      <router-link class="hover:font-bold text-center"
        :to="`/pokedex/${url[pokemon.name]}`">
        <img :src="`${imgURL}` + `${url[pokemon.name]}` + '.png'" width="96" height="96" alt="" class="m-auto hover:scale-110"/>
        <h3>{{ pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) }}</h3>
      </router-link>
    </div>
  </div>

</div>
</template>

<script>
import { toRefs, reactive, computed } from 'vue';

export default {
    name: "SearchView",

    setup(){
      const state = reactive({
        title: "PokeFinder",
        id: 0,
        pokemons: [],
        imgURL: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/",
        url: {},
        text: "",
        filteredPokemons: computed(()=>updatePokemon())
      })


      fetch("https://pokeapi.co/api/v2/pokemon?limit=1000")
            .then((res) => res.json())
            .then((data) => {
            state.pokemons = data.results;
            state.url = data.results.reduce((acc, cur, idx) => 
              acc = {...acc, [cur.name]:idx+1 }
            , {});
        })
            .catch((error) => {
            console.log(error.message);
        });
        
      function updatePokemon(){
        if(!state.text){
          return [] 
        }
        return state.pokemons.filter((pokemon)=> 
           pokemon.name.includes(state.text)
        )
      }

        return {...toRefs(state)}
    }
};
</script>
