import SearchViewVue from "@/views/SearchView.vue";
import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import getData from "@/components/getData";
var data = new getData();

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

const wrapper = shallowMount(SearchViewVue, {

  global: {
    stubs: {
      "router-link": RouterLinkStub,
    },
  },
});

describe("SearchView Component", () => {
  it("renders the header", ()=> {
    const header = wrapper.find("h1")
    expect(header.text()).toEqual("PokeFinder")
  });

  it("renders the search bar", () => {
    const searchbar = wrapper.find("input");
    expect(searchbar.exists()).toBeTruthy();
  });

  // it("renders router-link image", () => {
  //   const base = wrapper.find("router-link");
  //   expect(base.exists()).toBeTruthy();
  // });
});
