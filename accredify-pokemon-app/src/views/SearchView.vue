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
      v-for="(pokemon, idx) in updatePokemon()"
      :key="idx"
    >
      <router-link class="hover:font-bold text-center" v-if="pokemon!=null"
        :to="`/pokedex/${url[pokemon.name]}`">
        <img :src="`${imgURL}` + `${url[pokemon.name]}` + '.png'" width="96" height="96" alt="" class="m-auto hover:scale-110"/>
        <h3>{{ pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) }}</h3>
      </router-link>
    </div>
  </div>

</div>
</template>

<script>
import Data from '../components/getData'
import { reactive } from 'vue';

var pokemon = new Data();

export default {
    name: "SearchView",

    data: () => reactive({
        title: "PokeFinder",
        id: 0,
        pokemons: [],
        imgURL: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/",
        url: {
          name: "1",
          url: "https://pokeapi.co/api/v2/pokemon/1"
        },
        text: "",
    }),

    methods: {
      processPokemon(){
        var data = pokemon.fetchData(window.fetch);
        data.then(res => {
          this.pokemons = res.results;
          this.url = res.results.reduce((acc, cur, idx) => 
              acc = {...acc, [cur.name]:idx+1 }
            , {});
        })
      },

      updatePokemon(){

        if(this.text==""){
          return []
        }
        return this.pokemons.filter((pokemon)=> 
           pokemon.name.includes(this.text)
        )
      }

    },

    mounted(){
      this.processPokemon();
    }
};
</script>
