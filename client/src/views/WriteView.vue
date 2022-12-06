<template>
  <main class="mt-5">
    <div class="container bg-white ">
      <div class="row g-3 ">
        <div class="col-xl-1"></div>
        <div class="col-md-auto">
          <div v-if="!image" class="card" style="width: 25rem; border:none">
            <div 
              @dragenter.prevent="toggleActive" 
              @dragleave.prevent="toggleActive"
              @dragover.prevent
              @drop.prevent="dropUploadFile"
              :class="{'active-dropzone1': active}"
              class="dropzone1"
            >
              <span><b>Drag Your Photo</b></span>
              <span>Or</span>
              <label for="dropzoneFile" style="width: 100px;border-radius: 10px; cursor: pointer;">Push</label>
              <input type="file" id="dropzoneFile" class="dropzoneFile" @change="uploadFile($event.target.files)">
            </div>
          </div>
          <div v-if="image" class="card img fluid" style="width: 25rem; border:none; opacity: 0.5;">
            <div class="position-absolute top-0 end-0" style="cursor:pointer;" @click="deleteImage()"><h1>X</h1></div>
            <img :src="`/download/${name}/${image}`">
          </div>
        </div>
        <div class="col-xl-1"></div>
        <div class="col-md-auto">
          <div class="card" style="width: 25rem; border:none">
            <div class="list-group list-group-flush text-start">
              <div class="mb-3 row">
                <label class="col-sm-3 col-form-label">촬영일</label>
                <div class="col-md-9">
                  <input type="text" class="form-control"  placeholder="YYYY-MM-DD" v-model="date">
                </div>
              </div>
              <div class="mb-3 row">
                <label class="col-sm-3 col-form-label">날씨</label>
                <div class="col-md-9">
                  <input type="text" class="form-control" v-model="weather">
                </div>
              </div>
              <div class="mb-3 row">
                <label class="col-sm-3 col-form-label">기온</label>
                <div class="col-md-9">
                  <input type="text" class="form-control" v-model="temperature">
                </div>
              </div>
              <div class="mb-3 row">
                <label class="col-sm-3 col-form-label">상의</label>
                <div class="col-md-9">
                  <input type="text" class="form-control" v-model="top">
                </div>
              </div>
              <div class="mb-3 row">
                <label class="col-sm-3 col-form-label">하의</label>
                <div class="col-md-9">
                  <input type="text" class="form-control" v-model="bottom">
                </div>
              </div>
              <div class="mb-3 row">
                <label class="col-sm-3 col-form-label">신발</label>
                <div class="col-md-9">
                  <input type="text" class="form-control" v-model="shoes">
                </div>
              </div>
              <div class="mb-3 row">
                <label class="col-sm-3 col-form-label">악세사리</label>
                <div class="col-md-9">
                  <input type="text" class="form-control" v-model="acc">
                </div>
              </div>
              <div class="mb-3 row">
                <label class="col-sm-3 col-form-label">내용</label>
                <div class="col-md-9">
                  <textarea type="textarea" class="form-control" v-model="memo"></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-1"></div>
      </div>
      <button class="btn btn-lg btn-dark mt-3" type="submit" @click="write" style="width: 100px;border-radius: 10px;">등록</button>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      email:'',
      name:'',
      date: '',
      weather: '',
      temperature: '',
      top: '',
      bottom: '',
      shoes: '',
      acc: '',
      memo: '',
      image: null,
      dropzoneFile: '',
      active: false,
    }
  },
  created() {
    this.email = this.$store.state.user.email;
    if(this.$store.state.user.name) {
      this.name = this.$store.state.user.name}
    else {
      this.name = this.$store.state.user.profile.nickname;}
  },
  methods: {
    toggleActive () {
      if(this.active) {
        this.active = false;
      }
      else{
        this.active = true;
      }
    },
    async dropUploadFile(e) {
      if(this.active) {
        this.active = false;
      }
      else{
        this.active = true;
      }
      const files = e.dataTransfer.files
      let fileName = "";
      let data = null;
      if (files) {
        const date = Date.now();
        fileName = date + files[0].name;
        data = await this.$base64(files[0]);
      }
      const { error } = await this.$api(`/upload/${this.name}/${fileName}`, { data });
      this.image = fileName;
      if (error) {
        return alert("이미지 업로드 실패했습니다. 다시 시도하세요.");
      }
      alert("이미지가 업로드 되었습니다.");
    },
    async uploadFile(files) {
      let fileName = "";
      let data = null;
      if (files) {
        const date = Date.now();
        fileName = date + files[0].name;
        this.image = fileName;
        data = await this.$base64(files[0]);
      }
      const { error } = await this.$api(`/upload/${this.name}/${fileName}`, { data });
      this.image = fileName;
      if (error) {
        return alert("이미지 업로드 실패했습니다. 다시 시도하세요.");
      }
      alert("이미지가 업로드 되었습니다.");
    },
    deleteImage() {
      const confirmed = confirm('정말 삭제하시겠습니까?');
      if (confirmed) {
        this.$api(`/api/delete/${this.name}/${this.image}`);
        this.image = null;
      } 
    },
    async write(e) {
      e.preventDefault();
      console.log(this.email, this.date, this.weather, this.temperature, this.top, this.bottom, this.shoes, this.acc, this.memo, this.image)
      if(!this.image) return alert('이미지는 반드시 등록해 주세요');
      await this.$api("/api/insertInfo",{param:[this.email, this.date, this.weather, this.temperature, this.top, this.bottom, this.shoes, this.acc, this.memo, this.image]});
      alert('등록 완료.')
      this.$router.push('/');
    },
  }
}
</script>

<style >
.dropzone1 {
    width: 400px;
    height: 450px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 16px;
    border: 2px dashed #000;
    border-radius: 10px;
    background-color: #fff;
    transition: .3s ease all;
    
}

.dropzone1 > label {
  padding: 8px 12px;
  color: #fff;
  background-color:#000;
  transition: .3s ease all;
}

.dropzone1 > input {
    display: none;
}

.active-dropzone1 {
  color:#fff;
  border-color: #fff;
  background-color: #000;
}
.active-dropzone1 > label {
  padding: 8px 12px;
  color: #fff;
  background-color:#777;
  transition: .3s ease all;
}
.active-dropzone1 > input {
    display: none;
}
</style>
