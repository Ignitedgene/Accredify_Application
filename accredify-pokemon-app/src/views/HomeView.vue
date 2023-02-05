<template>
  <div class="select-none flex justify-center">
    <div class="font-bold text-center">
      <!-- Title -->
      <h1 class="font-extrabold text-2xl">Welcome to the Pokemon App</h1>

      <!-- Features -->
      <div class="grid grid-cols-2 py-10 px-20">
        <!-- Border -->
        <div
          class="col-start-1 px-20 pt-5 pb-16 border-2 rounded-xl bg-amber-200 bg-opacity-30"
        >
          <div class="flex flex-row justify-center">
            <span class="m-auto text-lg"
              >Some fun facts about this website!</span
            >
            <span
              ><img
                class="w-15 scale-150 -m-2"
                :src="pikachu.sprites.front_default"
                alt=""
            /></span>
          </div>
          <ul class="text-sm font-medium text-start">
            <ListItem> Hello </ListItem>
            <ListItem>
              This front-end project was built for Accredify Internship
              Application.
            </ListItem>
            <ListItem>
              This website was created using Vue 3 JS, Tailwind CSS, Router,
              Jest Unit-testing.
            </ListItem>
          </ul>
        </div>

        <div class="col-start-2">
          <div
            class="col-start-1 px-20 pt-5 pb-16 border-2 rounded-xl bg-amber-200 bg-opacity-30"
          >
            <div class="flex flex-row justify-center">
              <span class="m-auto text-lg"
                >Getting Started with this App!</span
              >
              <span
                ><img
                  class="w-15 scale-150 -m-2"
                  :src="pikachu.sprites.front_shiny"
                  alt=""
              /></span>
            </div>
            <ul class="text-sm font-medium text-start">
              <ListItem> 1. </ListItem>
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
    });
    fetch("https://pokeapi.co/api/v2/pokemon/pikachu/")
      .then((res) => res.json())
      .then((data) => {
        images.pikachu = data;
      })
      .catch((error) => {
        console.log(error.message);
      });
    return { ...toRefs(images) };
  },
  components: { ListItem },
};
</script>
