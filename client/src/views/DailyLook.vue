<template>
  <main class="mt-5">
    <div class="container bg-white">
      <h3>DailyLook</h3>
      <div class="row g-3">
        <div class="col-xxl-3 col-xl-4 col-md-6" :key="i" v-for="(look, i) in dailyLookList">
          <div class="card" style="width: 20rem; cursor: pointer;">
            <a @click="toInfoPage(look);"><img :src="`/download/${look.name}/${look.image}`" class="card-img" alt="..."></a>
            <p class="card-text"><b>{{look.name}}</b> | {{look.date}}</p>
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
      dailyLookList : [],
    }
  },
  created() {
    this.getDailyLook();
  },
  methods: {
    async getDailyLook() {
      let dailyLook = await this.$api("/api/getDailyLook", {})
      this.dailyLookList = dailyLook
    },
    toInfoPage(look) {
      this.$router.push({path:'/info', query:{id:look.id, name:look.name, image:look.image}})
    }
  }
}
</script>
