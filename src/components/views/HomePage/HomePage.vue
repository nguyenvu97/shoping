<script>
import Header from "@/components/views/HomePage/Header.vue";
import Footer from "@/components/views/HomePage/Footer.vue";
import Body from "@/components/views/HomePage/Body.vue";
import {Product_Service} from "@/service/Prodct_Service.js";

export default {
  name: 'HomePage',
  components: {
    Header,
    Footer,
    Body
  },

};
</script>


<template>
  <Header></Header>
  <main>
    <Body></Body>
  </main>
  <Footer></Footer>
</template>

<style scoped>


</style>
