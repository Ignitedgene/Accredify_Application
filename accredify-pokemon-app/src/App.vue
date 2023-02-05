<template>
  <div class="p-8 flex flex-col justify-center h-[25vh]">
    <div class="select-none flex flex-col text-center">
      <div class="flex flex-row justify-center">
        <span
          ><img
            :src="pokeball.sprites.default"
            class="w-16 px-2 m-auto align-middle"
            alt=""
        /></span>
        <span class="text-4xl font-bold text-yellow-400 font-outline-1 mb-2">
          Pokemon App
        </span>
        <span
          ><img
            :src="pokeball.sprites.default"
            class="w-16 px-2 m-auto align-middle"
            alt=""
        /></span>
      </div>
      <span class="text-sm font-semibold mb-3">Developed by Eugene Wee</span>
    </div>
    <nav
      class="text-center font-semibold border-t-4 pt-3 border-orange-500 border-opacity-40"
    >
      <router-link to="/">Home</router-link> |
      <router-link to="/search">Search</router-link> |
      <router-link to="/pokedex/:slug">Pokedex</router-link>
    </nav>
  </div>
  <router-view />
</template>

<script>
import { toRefs, reactive } from "vue";

export default {
  setup() {
    const images = reactive({
      pokeball: ""
    });

    fetch("https://pokeapi.co/api/v2/item/poke-ball/")
      .then((res) => res.json())
      .then((data) => {
        images.pokeball = data;
      })
      .catch((error) => {
        console.log(error.message);
      });

    return {...toRefs(images)};
  },
};
</script>

<style>
  .app{
    background-color: rgb(255, 238, 208)
  }
</style>
