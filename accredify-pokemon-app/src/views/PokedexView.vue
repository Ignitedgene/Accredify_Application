<template>
  <div v-if="pokemon" class="text-center">
    <div
      class="container h-[75vh] m-auto grid grid-cols-6 grid-rows-4 place-items-start gap-5"
    >
      <!-- IMAGE -->
      <Card class="col-start-2 row-start-1 row-span-2 col-span-2">
        <template v-slot:header>
          {{ name.charAt(0).toUpperCase() + name.slice(1) }}
        </template>

        <div class="flex flex-row">
          <img
            className="min-w-[30%] scale-[130%] m-auto justify-center"
            :src="pokemon.sprites.front_default"
            alt=""
          />

          <img
            className="min-w-[30%] scale-[130%] m-auto justify-center"
            :src="pokemon.sprites.back_default"
            alt=""
          />
        </div>

        <p class="text-base font-semibold py-1">
          <span class="font-bold"> Type: </span>
          <span
            v-for="typeVal in types"
            :key="typeVal.id"
            class="text-white rounded-xl px-3 py-0.5 align-middle"
            :class="{ [`bg-orange-400`]: 1 }"
          >
            {{ typeVal.charAt(0).toUpperCase() + typeVal.slice(1) + " " }}
          </span>
        </p>

        <p class="text-sm font-semibold">
          <span class="font-bold">Height: </span>
          <span>{{ height }} m | </span>
          <span class="font-bold">Weight: </span>
          <span>{{ weight }} lbs</span> |
          <span class="font-bold">Experience: </span>
          <span>{{ exp }} pts</span>
        </p>
      </Card>

      <!-- BASE STATS -->
      <Card class="row-start-1 col-start-4">
        <template v-slot:header> Base Stats </template>

        <span
          v-for="stat in stats"
          :key="stat.id"
          class="flex flex-col mx-auto text-start pl-2"
        >
          {{ stat.name.toUpperCase().replace("-", " ") }} : {{ stat.value }}
        </span>
      </Card>

      <!-- Location -->
      <Card class="col-start-5 row-start-1">
        <template v-slot:header> Locations Found! </template>

        <div
          v-for="loc in locations.slice(0, 5)"
          :key="loc.id"
          class="border-2 border-gray-500 py-0.5 px-1 my-1.5 rounded-2xl"
        >
          {{ loc.replaceAll("-", " ").toUpperCase() }}
        </div>

        <div
          v-if="locations.length == 0"
          class="m-auto align-middle inline-block"
        >
          No Locations found.
        </div>
      </Card>

      <!-- Abilities -->
      <Card class="col-start-2 row-start-3 relative">
        <template v-slot:header> Unique Abilities </template>
        <div v-for="ability in abilities" :key="ability.id" class="py-1 px-4">
          <Card
            @click="hover = ability.name"
            class="hover:scale-105 select-none"
          >
            {{
              ability.name.charAt(0).toUpperCase() +
              ability.name.slice(1).replace("-", " ")
            }}
          </Card>
          <Modal v-if="hover == ability.name" @click="hover = false">
            <Card class="bg-opacity-100 bg-orange-100">
              <template v-slot:header>
                {{
                  ability.name.charAt(0).toUpperCase() +
                  ability.name.slice(1).replace("-", " ")
                }}
              </template>
              {{ ability.desc }}
            </Card>
          </Modal>
        </div>
      </Card>

      <!-- MOVESET  -->
      <Card class="col-start-3 row-start-3 col-span-3">
        <template v-slot:header>Moves Set</template>

        <div class="flex flex-row flex-wrap justify-center">
          <div v-for="move in moves.slice(0, 10)" :key="move.id">
            <Card
              class="min-w-0 w-32 m-1 bg-amber-200 select-none hover:scale-105"
              @click="hover = move.name"
            >
              {{
                move.name.charAt(0).toUpperCase() +
                move.name.slice(1).replace("-", " ")
              }}
            </Card>

            <Modal v-if="hover == move.name" @click="hover = false">
              <Card class="bg-opacity-100 bg-orange-100">
                <template v-slot:header>
                  {{
                    move.name.charAt(0).toUpperCase() +
                    move.name.slice(1).replace("-", " ")
                  }}
                </template>
                {{ move.desc.replace("$effect_chance", move.chance) }}
              </Card>
            </Modal>
          </div>
        </div>
      </Card>
    </div>
  </div>

  <div v-else class="p-4 flex justify-center text-2xl font-bold">
    <span>Begin by Searching a Pokemon! </span>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
import Card from "../components/Card.vue";
import Modal from "@/components/Modal.vue";

export default {
  components: {
    Card,
    Modal,
  },
  data() {
    return {
      hover: false,
    };
  },
  setup() {
    const route = useRoute();

    const pokemon = reactive({
      pokemon: null,
      name: "",
      height: "",
      weight: "",
      exp: "",
      types: [],
      moves: [],
      stats: [],
      abilities: [],
      locations: [],
    });

    fetch(`https://pokeapi.co/api/v2/pokemon/${route.params.slug}/`)
      .then((res) => res.json())
      .then((data) => {
        // General
        pokemon.pokemon = data;
        pokemon.name = data.name;
        pokemon.height = data.height;
        pokemon.weight = data.weight;
        pokemon.exp = data.base_experience;

        // Types
        data.types.forEach((element) => {
          pokemon.types.push(element.type.name);
        });

        // Moves
        data.moves.forEach((element) => {
          pokemon.moves.push({
            name: element.move.name,
          });
          fetch(element.move.url)
            .then((res) => res.json())
            .then((data) => {
              pokemon.moves.forEach((element) => {
                if (element.name == data.name) {
                  element.desc = data.effect_entries[0].effect;
                  element.chance = data.effect_chance;
                }
              });
            });
        });

        // Stats
        data.stats.forEach((element) => {
          pokemon.stats.push({
            name: element.stat.name,
            value: element.base_stat,
          });
        });

        // Location
        fetch(data.location_area_encounters)
          .then((res) => res.json())
          .then((data) => {
            data.forEach((element) => {
              pokemon.locations.push(element.location_area.name);
            });
          });

        // Abilities
        data.abilities.forEach((element) => {
          pokemon.abilities.push({
            name: element.ability.name,
            url: element.ability.url,
          });
          fetch(element.ability.url)
            .then((res) => res.json())
            .then((data) => {
              pokemon.abilities.forEach((element) => {
                if (element.name == data.name) {
                  element.desc = data.effect_entries[1].effect;
                }
              });
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });

    return { ...toRefs(pokemon) };
  },
};
</script>
