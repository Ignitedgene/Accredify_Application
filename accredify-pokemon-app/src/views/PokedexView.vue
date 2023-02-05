<template>
  <div v-if="pokemon" class="text-center">
    <div
      class="container h-[75vh] m-auto grid grid-cols-6 grid-rows-4 place-items-start gap-5"
    >
    <!-- IMAGE -->
      <div
        class="col-start-2 row-start-1 row-span-2 bg-orange-50 border-2 border-black p-4 mx-auto min-w-full min-h-full"
      >
        <img
          className="min-w-[80%] m-auto justify-center"
          :src="pokemon.sprites.front_default"
          alt=""
        />

        <h1 class="text-2xl font-bold mb-2">
          {{ name.charAt(0).toUpperCase() + name.slice(1) }}
        </h1>

        <p class="text-lg font-semibold">
          <span class="font-bold"> Type: </span>
          <span v-for="typeVal in types" :key="typeVal.id">
            {{ typeVal.charAt(0).toUpperCase() + typeVal.slice(1) + " " }}
          </span>
        </p>
      </div>

      <!-- BASE STATS -->
      <div class="row-start-3 col-start-2 font-bold text-sm border-black border-2 p-2 mx-auto bg-amber-50 bg-opacity-60 min-w-full">


        <h1 class="text-base font-extrabold px-3">
          {{ "Base Stats"}}
        </h1>

        <span v-for="stat in stats" :key="stat.id" class="flex flex-col mx-auto place-items-start pl-3">
          {{ stat.name.toUpperCase().replace("-", " ") }} : {{ stat.value }} 
        </span>

      </div>


    <!-- MOVESET  -->
      <div
        class="col-start-3 row-start-3 col-span-3 font-bold text-sm border-2 border-black bg-amber-100 bg-opacity-60 p-3 min-h-full"
      >
        <h1 class="text-xl mb-2">Moves Set</h1>

        <div class="flex flex-wrap justify-center">
          <p
            v-for="move in moves.slice(0, 10)"
            :key="move.id"
            class="border-2 border-black border-opacity-60 bg-stone-400 bg-opacity-30 text-sm font-bold rounded-xl w-32 p-2 m-1"
          >
            <span>
              {{
                move.charAt(0).toUpperCase() + move.slice(1).replace("-", " ")
              }}
            </span>
          </p>
        </div>
      </div>

      <AppDropDown>
        <template slot="toggler">
        <button
            class="relative flex items-center focus:outline-none pl-5 pr-3 py-2 rounded-lg bg-gray-300 text-gray-800 font-semibold"
          >
        Locations
        </button>
      </template>
        <AppDropDownContent>

          <AppDropDownItem v-for="loc in locations" :key="loc.id">
            {{ loc }}
          </AppDropDownItem>
        </AppDropDownContent>
      </AppDropDown>


    </div>
  </div>

  <div v-else class="p-4 flex justify-center text-2xl font-bold">
    <span>Begin by Searching a Pokemon! </span>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
import AppDropDown from '../components/AppDropdown/AppDropdown.vue'
import AppDropDownContent from '../components/AppDropdown/AppDropDownContent.vue'
import AppDropDownItem from '../components/AppDropdown/AppDropDownItem.vue'

export default {
  components:{
    AppDropDown, 
    AppDropDownContent, 
    AppDropDownItem
  },
  setup() {
    const route = useRoute();

    const pokemon = reactive({
      pokemon: null,
      name: "",
      types: [],
      moves: [],
      stats: [],
      abilities: [],
      forms: [],
      locations: []
    });

    fetch(`https://pokeapi.co/api/v2/pokemon/${route.params.slug}/`)
      .then((res) => res.json())
      .then((data) => {
        // General
        pokemon.pokemon = data;
        pokemon.name = data.name;

        // Types
        data.types.forEach((element) => {
          pokemon.types.push(element.type.name);
        });

        // Moves
        data.moves.forEach((element) => {
          pokemon.moves.push(element.move.name);
        });


        // Stats
        data.stats.forEach((element) => {
          pokemon.stats.push({
            name: element.stat.name,
            value: element.base_stat
          })
        })

        fetch(data.location_area_encounters)
          .then((res) => res.json())
          .then((data)=>{
            data.forEach(element => {
              pokemon.locations.push(element.location_area.name)
            });
          })

        console.log(data);
      });

    // fetch(`https://pokeapi.co/api/v2/characteristic/${route.params.slug}/`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     // General
    //     console.log(data)
    // })

    return { ...toRefs(pokemon) };
  },
};
</script>
