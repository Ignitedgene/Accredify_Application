<template>
  <div class="select-none flex justify-center">
    <div class="font-bold text-center ">
      <!-- Title -->
      <h1 class="font-extrabold text-2xl">Welcome to the Pokemon App</h1>

      <!-- Features -->
      <div class="grid grid-cols-2 py-10 px-20">
        <!-- Border -->
        <div
          class="min-h-full col-start-1 px-20 pt-5 border-2 rounded-xl bg-amber-200 bg-opacity-30 mx-5"
        >
          <div class="flex flex-row justify-center">
            <span class="m-auto text-lg"
              >Some fun facts about this website!</span
            >
            <span
              ><img
                class="w-15 scale-150 -m-2"
                :src="pikachu"
                alt=""
            /></span>
          </div>
          <ul class="text-sm font-medium text-start">
            <ListItem class="text-justify"> Greetings! This mini front-end project (inspired by the PokeDex) which was created for my Accredify Internship Application. I built it using Vue3.JS, Tailwind CSS, Browser History Routes and Jest Unit Testing. </ListItem>
            <ListItem>
              Github Repository: <a class="font-bold underline" href="https://github.com/Ignitedgene/Accredify_Application">Click Here!</a>
            </ListItem>
          </ul>
        </div>

        <div class="col-start-2 mx-5">
          <div
            class="min-h-full col-start-1 px-20 pt-5 border-2 rounded-xl bg-orange-200 bg-opacity-30"
          >
            <div class="flex flex-row justify-center">
              <span class="m-auto text-lg"
                >Getting Started with this App!</span
              >
              <span
                ><img
                  class="w-15 scale-150 -m-2"
                  :src="pikachu_Shiny"
                  alt=""
              /></span>
            </div>
            <ul class="text-sm font-medium text-start">
              <ListItem> 1. Search for a Pokemon </ListItem>
              <ListItem> 2. View the characteristics of the Pokemon</ListItem>
              <ListItem> 3. Hover over the Moves/ Abilities to find out more!</ListItem>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ListItem from "@/components/ListItem.vue";
import { toRefs, reactive } from "vue";

export default {
  setup() {
    const images = reactive({
      pikachu: "",
      pikachu_Shiny: ""
    });
    fetch("https://pokeapi.co/api/v2/pokemon/pikachu/")
      .then((res) => res.json())
      .then((data) => {
        images.pikachu = data.sprites.front_default;
        images.pikachu_Shiny = data.sprites.front_shiny;
      })
      .catch((error) => {
        console.log(error.message);
      });
    return { ...toRefs(images) };
  },
  components: { ListItem },
};
</script>
