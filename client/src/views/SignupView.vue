<template>
  <main class="mt-5">
    <div class="container" style="width: 400px;">
      <form>
        <h1 class="h3 mb-3 fw-normal text-center">회원가입</h1>
        <div>
          <small v-if="(!emailDuplicate)" class=""><b>이메일</b></small>
          <small v-else-if="(emailDuplicate)" style="color:red;"><b>중복된 이메일입니다.</b></small>
        </div>
        <div class="form-floating">
          <input type="email" class="form-control" id="id" placeholder="name@example.com" v-model="email" @keyup="emailCheck">
          <label for="floatingInput">Email address</label>
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
        <button class="w-100 btn btn-lg btn-dark mt-3" type="submit" @click="signup">회원가입</button>
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
      userData: {},
      emailDuplicate: false,
      nameDuplicate: false,
      passwordRule: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      rule: "",
      signupInfo: {}
    }
  },
  created() {
    this.rule = new RegExp(this.passwordRule);
  },
  methods: {
    async signup(e) {
      e.preventDefault();
      this.signupInfo = {
        email: this.email,
        password: this.password,
        name: this.name,
      }
      let flag = !this.emailDuplicate && !this.nameDuplicate && this.password.length > 5 && this.rule.test(this.password)  && this.password === this.passwordConfirm;
      if(!flag) {
        return alert('회원가입 실패 다시 확인해주세요')
      }
      else {
        const signup = await this.$api("/api/signup", {param:[this.signupInfo]});
        if(signup) {
          alert(`회원가입 성공 : 환영합니다 ${this.name} 님`);
          this.$router.push('/login');
        }
      }
    },
    async emailCheck() {
      const emailCheck = await this.$api("/api/emailCheck", {param:[this.email]});
      if(emailCheck) {
        this.emailDuplicate = true;
      }
      else{
        this.emailDuplicate = false;
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
  }

}
</script>
