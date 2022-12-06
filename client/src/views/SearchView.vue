<template>
  <div class="container mt-5">
    <div class="row g-3">
      <div class="col-xl-2"></div>
      <div class="col-xl-8">
        <form class="row g-3">
          <div>
            <h2>Search</h2>
          </div>
          <div>
            <label for="search" class="visually-hidden">search</label>
            <input type="text" class="form-control" id="search" placeholder="검색어를 입력하세요" v-model="searchData">
            <small v-if="(searchData.length <= 1 && searchData.length > 0)" style="color:red">검색어를 2자 이상 입력하세요</small>
          </div>
          <div>
            <button type="submit" class="btn btn-dark mb-3" @click="search">Search</button>
          </div>
          <div>
          </div>
        </form>
      </div>
      <div class="col-xl-2"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchData : "",
      searchResult : {},
      // result:''
    }
  },
  
  methods: {
    async search(e) {
      e.preventDefault();
      if(this.searchData.length < 2) return alert('검색어를 2자 이상 입력하세요')
      let search = await this.$api("/api/search", {param:['%'+this.searchData+'%', '%'+this.searchData+'%', '%'+this.searchData+'%', '%'+this.searchData+'%', '%'+this.searchData+'%', '%'+this.searchData+'%', '%'+this.searchData+'%']})
      this.searchResult = search;
      let data = []

      // console.log(search[0].id);
      if(search.length < 2) {
        data = [search[0].id]
      }
      else{
        for(let key in search) {
          data.push(search[key].id);
        }
      }
      this.$router.push({path:"/result", query:{data:data, result:this.searchData}})
    },
  }
}
</script>