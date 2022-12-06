<template>
  <main class="mt-3">
    <div class="container bg-white ">
      <div class="row g-3">
        <div class="col-xl-2"></div>
        <div class="col-xl-4"></div>
        <div class="col-xl-4">
          <form v-if="(mine)" class="float-end" role="search">
            <a class="navbar-brand" @click="edit(dailyLookInfo)" style="margin-right:10px">
              <img :src="editImg" alt="" width="24" height="24">
            </a>
            <a class="navbar-brand" @click="erase" style="cursor:pointer">
              <img :src="eraseImg" alt="" width="24" height="24">
            </a>
          </form>
          <div v-else class="mt-5"></div>
        </div>
        <div class="col-xl-2"></div>
      </div>
    </div>
    <div class="container bg-white ">
      <div class="row g-3 mt-1">
        <div class="col-xl-2"></div>
        <div class="col-xl-auto">
          <div class="card" style="width: 25rem;">
            <img :src="`/download/${name}/${image}`" class="card-img" >
          </div>
        </div>
        <div class="col-xl-auto">
          <div class="card" style="width: 25rem;">
            <ul class="list-group list-group-flush text-start">
              <li class="list-group-item">촬영일 : {{dailyLookInfo.date}}</li>
              <li class="list-group-item">날씨 : {{dailyLookInfo.weather}}</li>
              <li class="list-group-item">기온 : {{dailyLookInfo.temperature}}</li>
              <li class="list-group-item">상의 : {{dailyLookInfo.top}}</li>
              <li class="list-group-item">하의 : {{dailyLookInfo.bottom}}</li>
              <li class="list-group-item">신발 : {{dailyLookInfo.shoes}}</li>
              <li class="list-group-item">악세사리 : {{dailyLookInfo.acc}}</li>
              <li class="list-group-item" style="border:none"><b>내용</b></li>
              <li class="list-group-item">{{dailyLookInfo.memo}}</li>
            </ul>
          </div>
        </div>
        <div class="col-xl-2"></div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      editImg: require('../assets/wrench.png'),
      eraseImg: require('../assets/trash.png'),
      dailyLookId: 0,
      dailyLookInfo : {},
      email:'',
      name:'',
      image:'',
      mine: false
    }
  },
  created() {
    this.email = this.$store.state.user.email;
    this.dailyLookId = this.$route.query.id;
    this.name = this.$route.query.name;
    this.image = this.$route.query.image;
    this.getDailyLookInfo();
    if(this.$route.query.name===this.$store.state.user.name) this.mine = true;
  },
  methods: {
    async getDailyLookInfo() {
      let dailyLookInfo = await this.$api("/api/getInfo", {param:[this.dailyLookId]});
      if(dailyLookInfo.length > 0) {
        this.dailyLookInfo = dailyLookInfo[0];
      }
    },
    erase() {
      const confirmed = confirm('정말 삭제하시겠습니까?');
      if (confirmed) {
        this.$api(`/api/delete/${this.name}/${this.image}`);
        this.$api("/api/erase", {param:[this.dailyLookId]});
        alert('삭제 완료')
        this.$router.push("/");
      } 
    },
    edit() {
      const confirmed = confirm('수정하시겠습니까?');
      if (confirmed) {
        this.$router.push({path:'/edit', query:{id:this.dailyLookId}})
      } 
    }
  }
}
</script>
