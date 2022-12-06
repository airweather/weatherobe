<template>
  <main class="mt-5">
    <div class="container" style="width: 400px;">
      <form>
        <h1 class="h3 mb-3 fw-normal text-center">로그인</h1>
        <div class="form-floating">
          <input type="email" class="form-control" id="id" placeholder="name@example.com" v-model="email">
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
          <input type="password" class="form-control" id="password" placeholder="Password" v-model="password">
          <label for="floatingPassword">Password</label>
        </div>
        <div class="mt-1 float-start">
          <router-link to="/signup" style="text-decoration:none;color:black"><small>회원가입</small></router-link>
        </div>
        <button class="w-100 btn btn-lg btn-dark mt-3" type="submit" @click="loginSubmit">로그인</button>
        <button class="w-100 btn btn-lg"><img :src="kakaoLoginImg" alt="" @click="kakaoLogin"></button>
        <p class="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
      </form>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      userData: {},
      kakaoLoginImg: require('../assets/kakao_login_medium_wide.png')
    }
  },
  methods: {
    async loginSubmit(e) {
      e.preventDefault();
      this.userData.email = this.email;
      this.userData.password = this.password;
      const loginData = await this.$api("/api/getLogin", {param:[this.email, this.password]});
      if(loginData.email) {
        alert(`로그인 성공 : 안녕하세요 ${loginData.name} 님`);
        this.$store.commit("user", loginData);
        this.$router.push('/');
      }
      else {
         alert('로그인 실패 : ID와 비밀번호를 확인해주세요')
      }
    },
    kakaoLogin() {
      window.Kakao.Auth.login({
        scope:'profile_nickname, account_email, gender',
        success: this.getProfile,
      });
      this.$router.push('/',{})
    },
    getProfile(authObj) {
      console.log(authObj);
      window.Kakao.API.request({
        url:'/v2/user/me',
        success: res => {
          const kakao_account = res.kakao_account;
          this.login(kakao_account);
          alert("카카오 로그인 성공!");
        }
      });
    },
    async login(kakao_account) {
      const pass = Math.floor(Math.random()*1000000000).toString();
      await this.$api("/api/kakaoLogin", {
        param: [
          {email:kakao_account.email, name:kakao_account.profile.nickname, password:pass, sso:0,},
          {name:kakao_account.profile.nickname, password:pass}
         ]
      });
      this.$store.commit("user", kakao_account);
    },
  }
}
</script>
