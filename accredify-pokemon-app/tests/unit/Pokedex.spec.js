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
    // Mounting the component, and passing in the relevant props and stubs
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

    // Adding of slug parameter (ERROR)
    const history = createMemoryHistory();
    history.push("1")

    it("renders unselected pokemon page", ()=>{
        const text = wrapper.find("span")
        expect(text.text()).toContain("Begin by Searching a Pokemon!")
    })

    describe("Mimic an API request with dummy data", ()=>{
        it("render selected pokemon image", ()=>{
            const img = wrapper.find("img");
            expect(img.exists()).toBeTruthy;
        })

        it("render ability card component", ()=>{
            const card = wrapper.find("template")
            expect(card.text()).toContain("Unique Abilities")
        })
        
        it("render base stats card component", ()=>{
            const card = wrapper.find("template")
            expect(card.text()).toContain("Base Stats")
        })        
        
        
        it("render location stats card component", ()=>{
            const card = wrapper.find("template")
            expect(card.text()).toContain("Locations Found!")
        })        })
});
