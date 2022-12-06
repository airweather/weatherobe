<template>
  <main class="mt-5">
    <div class="container bg-white">
      <div class="row g-3">
        <h1>My wardrobe</h1>
        <div class="col" :key="i" v-for="(look, i) in myWardrobeList">
          <div class="card" style="width: 15rem; cursor: pointer;">
            <a @click="toInfoPage(look);"><img :src="`/download/${look.name}/${look.image}`" class="card-img" alt="..."></a>
            <p class="card-text">{{look.date}}</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      myWardrobeList: [],
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  mounted() {
    if(this.user.email === undefined) {
      this.$router.push({path:'/'});
    }
    
  },
  created() {
    this.getMyWardrobe();
    // console.log(this.myWardrobeList)
  },
  methods: {
    async getMyWardrobe() {
      let myWardrobe = await this.$api("/api/getMyWardrobe", {param:[this.$store.state.user.email]})
      console.log(myWardrobe);
      this.myWardrobeList = myWardrobe
    },
    toInfoPage(look) {
      this.$router.push({path:'/info', query:{id:look.id, name:look.name, image:look.image}})
    }
  }
  
}
</script>