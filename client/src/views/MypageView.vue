<template>
  <main class="mt-5">
    <div class="container" style="width: 400px;">
      <form>
        <h1 class="h3 mb-3 fw-normal text-center">마이페이지</h1>
        <div class="text-start mt-3 mb-3">
          <h5>이메일  :  <b>{{email}}</b></h5>
        </div>
        <div class="mt-2">
          <small><b>비밀번호</b></small>
        </div>
        <div class="form-floating mt-1">
          <input type="password" class="form-control" id="password" placeholder="Password" v-model="password">
          <label for="floatingPassword">Password</label>
        </div>
        <div>
          <small v-if="(password.length > 0 && !rule.test(password))" style="color:red;">
            <b>비밀번호는 영문자와 숫자가 1개 이상, 총 6자 이상이어햐 합니다.</b>
          </small>
        </div>
        <div class="mt-2">
          <small><b>비밀번호 확인</b></small>
        </div>
        <div class="form-floating mt-1">
          <input type="password" class="form-control" id="password" placeholder="Password" v-model="passwordConfirm">
          <label for="floatingPassword">Password</label>
        </div>
        <small v-if="(passwordConfirm.length > 5 && password !== passwordConfirm)" style="color:red;">
          <b>비밀번호가 일치하지 않습니다.</b>
        </small>
        <div class="mt-2">
          <small v-if="(!nameDuplicate)"><b>닉네임</b></small>
          <small v-else-if="(nameDuplicate)" style="color:red;"><b>중복된 닉네임입니다.</b></small>
        </div>
        <div class="form-floating mt-1">
          <input type="text" class="form-control" id="password" placeholder="Password" v-model="name" @keyup="nameCheck">
          <label for="floatingPassword">Nickname</label>
        </div>
        <div class="mt-3">
          <button class="btn btn-lg btn-dark mr-3" type="submit" @click="update">정보변경</button>
          <button class="btn btn-lg btn-danger" type="submit" @click="withdrawal">회원탈퇴</button>
        </div>
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
      passwordConfirm: "",
      name:"",
      nameDuplicate: false,
      passwordRule: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      rule: "",
    }
  },
  created() {
    this.rule = new RegExp(this.passwordRule);
    this.email = this.$store.state.user.email; 
    this.name = this.$store.state.user.name; 
    console.log(this.$store.state.user);
  },
  mounted() {
    
  },
  methods: {
    async update(e) {
      e.preventDefault();
      let flag = !this.nameDuplicate && this.password.length > 5 && this.rule.test(this.password)  && this.password === this.passwordConfirm;
      if(!flag) {
        return alert('정보변경 실패 다시 확인해주세요')
      }
      else {
        const update = await this.$api("/api/changeUser", {param:[this.password, this.name, this.email]});
        if(update) {
          this.$store.commit("user", {});
          alert(`정보변경 완료 다시 로그인 해 주세요`);
          this.$router.push("/");
        }
      }
    },
    
    async nameCheck() {
      const nameCheck = await this.$api("/api/nameCheck", {param:[this.name]});
      if(nameCheck) {
        this.nameDuplicate = true;
      }
      else{
        this.nameDuplicate = false;
      }
    },

    async withdrawal() {
      const confirm = prompt(`정말 탈퇴하시겠습니까? \n My Wardrobe의 모든 데이터가 삭제됩니다. \n 원하시면 닉네임을 입력해주세요.`);
      if(confirm === this.$store.state.user.name) {
        const withdrawal = await this.$api("/api/signout", {param:[this.email, this.name]});
        console.log(withdrawal);
        this.$store.commit("user", {});
        alert('탈퇴가 완료되었습니다.');
        this.$router.push('/');
      }
      else{
        return alert('닉네임을 다시 입력해주세요');
      }
      console.log(prompt);
    },
  }

}
</script>
