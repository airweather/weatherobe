<template>
<div>
  <header style="border-bottom: 1px solid #ddd;">
    <div style="background-color: #000; height:8px;"></div>
    <div class="container text-center" >
      <div class="row align-items-center">
        <div class="col">
          <h1 class="pt-3">WEATHEROBE</h1>
        </div>
      </div>
    </div>
    <nav class="navbar navbar-expand-lg">
      <div class="container">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarScroll">
          <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
            <li class="nav-item">
              <router-link class="nav-link" id="daily-look" aria-current="page" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" id="daily-look" aria-current="page" to="/dailylook">DailyLook</router-link>
            </li>
            <li v-if="user.email!==undefined" class="nav-item">
              <router-link class="nav-link" id="my-wardrobe" aria-current="page" to="wardrobe">MyWardrobe</router-link>
            </li>
          </ul>
          <form class="d-flex" role="search">
            <router-link v-if="(user.email!==undefined)" class="navbar-brand" to="/write">
              <img :src="writeImg" alt="" width="24" height="24">
            </router-link>
            <router-link v-if="(user.email!==undefined && user.sso ===1)" class="navbar-brand" to="/mypage">
              <img :src="mypageImg" alt="" width="24" height="24">
            </router-link>
            <router-link class="navbar-brand" to="/search">
              <img :src="searchImg" alt="" width="20" height="20">
            </router-link>
            <router-link v-if="user.email===undefined" class="navbar-brand" to="/login">
                <img :src="loginImg" alt="" width="20" height="20"> <small>login</small>
            </router-link>
            <a v-if="user.email!==undefined" class="navbar-brand" style="cursor: pointer;" @click="logout">
                <img :src="logoutImg" alt="" width="20" height="20"/> <small>logout</small>
            </a>
          </form>
        </div>
      </div>
    </nav>
  </header>
  <router-view/>
  <footer class="container mt-5">
    <p class="float-end"><a href="#" >WEATHEROBE</a></p>
    <p>&copy; 2017–2022 Company, Inc. &middot; <a href="#">Privacy</a> &middot; <a href="#">Terms</a></p>
  </footer>
</div>  
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      loginImg: require('./assets/login.png'),
      logoutImg: require('./assets/logout.png'),
      searchImg: require('./assets/search2.png'),
      mypageImg: require('./assets/mypage.png'),
      writeImg: require('./assets/write.png'),
     
    }
  },
 
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    logout() {
      if(this.$store.state.user.sso === 0) {
        window.Kakao.Auth.logout((response) => {
          console.log(response);
          this.$store.commit("user", {});
        })
      }
      else{
        this.$store.commit("user", {});
      }
      alert('로그아웃');
    },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

p a {
  text-decoration:none;
  color:#000;
}
</style>
