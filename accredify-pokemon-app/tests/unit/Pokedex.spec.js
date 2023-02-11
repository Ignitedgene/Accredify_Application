import PokedexView from "@/views/PokedexView.vue";
import { RouterLinkStub, shallowMount } from "@vue/test-utils";
import { createMemoryHistory } from "vue-router";

const fakeData = {
    text: "a",
    results: [{
        name: "",
        url: "https://pokeapi.co/api/v2/pokemon/1"
    }],
    
  }
  
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeData),
    })
  );
  

describe("For PokedexView", () => {
    const wrapper = shallowMount(PokedexView, {
        props:{
            route: "1"
        },
        global: {
            stubs: {
              "router-link": RouterLinkStub,
            },
          }
    })

    const history = createMemoryHistory();
    history.push("1")

    it("renders unselected pokemon page", ()=>{
        const text = wrapper.find("span")
        expect(text.text()).toContain("Begin by Searching a Pokemon!")
    })
});
