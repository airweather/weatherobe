<template>
    <main class="mt-5">
      <div class="container bg-white">
        <h3>Result : <b>{{searchResult}}</b></h3>
        <div class="row g-3">
          <div class="col-xxl-3 col-xl-4 col-md-6" :key="i" v-for="(look, i) in searchResultList">
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
        searchResultList: [],
        searchResult: ""
      }
    },
    created() {
      this.dailyLookList = this.$route.query.data;
      this.searchResult = this.$route.query.result;
      this.getSearchResult();
    },
    methods: {
    async getSearchResult() {
      const list = [];
      for(let key in this.dailyLookList) {
        list.push(this.dailyLookList[key]);
      }
     
      let searchResult = await this.$api("/api/searchResult", {param:[this.$route.query.data]})
      this.searchResultList = searchResult
    },
      toInfoPage(look) {
        this.$router.push({path:'/info', query:{id:look.id, name:look.name, image:look.image}})
      }
    }
  }
  </script>
