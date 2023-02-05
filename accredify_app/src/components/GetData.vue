<template>
    <div>

    </div>
</template>

<script>
export default {
  name: "GetData",
  data() {
    return {
      data: null
    };
  },
  async created() {
    // Simple GET request using fetch
    const response = await fetch("https://pokeapi.co/api/v2/");
    const data = await response.json();
    console.log(data);
  }
};
</script>

<style lang="scss" scoped>

</style>