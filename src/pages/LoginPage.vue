<template>
 <div class="main-div">
  <div class="box">
   <div class="wave -one"></div>
   <div class="wave -two"></div>
   <div class="wave -three"></div>
  </div>
  <div class="main">
   <form @submit.prevent="login">
    <div class="card">
     <h2>Log In</h2>
     <div>
      <div class="input-wraper">
       <input
        type="text"
        id="username"
        v-model="username"
        placeholder="Username"
       />
      </div>
      <p class="errorMsg" v-if="this.errorList.usernameBul">
       {{ this.errorList.username }}
      </p>
     </div>
     <div>
      <div class="input-wraper">
       <input
        type="password"
        id="password"
        v-model="password"
        placeholder="Password"
       />
      </div>
      <p class="errorMsg" v-if="this.errorList.passwordBul">
       {{ this.errorList.password }}
      </p>
     </div>
     <button type="submit">Log in</button>
    </div>
   </form>
  </div>
 </div>
</template>

<script>
import { mapStores } from "pinia";
import { useStudentsStore } from "../store/index";

export default {
 data() {
  return {
   username: "",
   password: "",
   errorList: {
    usernameBul: false,
    username: "",
    passwordBul: false,
    password: "",
   },
   validatedUser: false,
  };
 },
 methods: {
  login() {
   this.validateData();
   if (!this.passwordBul && !this.errorList.passwordBul && this.validatedUser) {
    this.studentsStore.logIn();
    this.$router.push("/");
   }
  },
  validateData() {
   if (this.username.trim() === "") {
    this.errorList.usernameBul = true;
    this.errorList.username = "Please fill the username field";
   } else {
    this.errorList.usernameBul = false;
    this.errorList.username = "";
   }
   if (this.password.trim() === "") {
    this.errorList.passwordBul = true;
    this.errorList.password = "Please fill the password field";
   } else {
    this.errorList.passwordBul = false;
    this.errorList.password = "";
   }
   if (this.username.trim() === "") {
    this.errorList.usernameBul = true;
    this.errorList.username = "Please fill the username field";
   }
   if (!this.passwordBul && !this.errorList.passwordBul) {
    this.validateUser();
   }
  },
  validateUser() {
   const users = this.studentsStore.getUsers;
   const foundUser = users.find((x) => x.username === this.username);
   if (typeof foundUser === "undefined") {
    this.errorList.usernameBul = true;
    this.errorList.username = "This user doesn't exist";
   } else if (foundUser.password !== this.password) {
    this.errorList.usernameBul = false;
    this.errorList.username = "";
    this.errorList.passwordBul = true;
    this.errorList.password = "The password doesn't match this user";
   } else {
    this.errorList.passwordBul = false;
    this.errorList.password = "";
    this.validatedUser = true;
   }
  },
 },
 computed: {
  ...mapStores(useStudentsStore),
 },
};
</script>

<style scoped>
.main {
 display: flex;
 align-items: center;
 justify-content: center;
 padding: 0;
 margin: 0;
 width: 100%;
 height: 100vh;
}
.card {
 border: none;
 outline: none;
 z-index: 2;
 display: flex;
 flex-direction: column;
 padding: 5rem;
 border-radius: 1.5rem;
 background: rgb(186, 188, 190);
 background: linear-gradient(
  45deg,
  rgba(186, 188, 190, 1) 16%,
  rgba(53, 59, 66, 1) 100%
 );
}

.input-wraper {
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: center;
 height: min-content;
 margin: 1rem;
}

input {
 border-radius: 50rem;
 border: none;
 outline: none;
 background-color: #a3a8ac;
 font-size: 1.1rem;
 margin: 0;
 padding: 0.5rem 1rem;
}

button {
 margin: 1rem auto;
 border: none;
 outline: none;
 font-size: 1.3rem;
 background: rgb(186, 188, 190);
 background: linear-gradient(
  45deg,
  rgba(53, 59, 66, 0.579) 0%,
  rgba(186, 188, 190, 0.699) 100%
 );
 color: #c4c8cb;
 border-radius: 10rem;
 width: 10rem;
 height: 3rem;
}

h2 {
 color: #c4c8cb;
 font-size: 3rem;
 margin: 0;
 padding: 0;
}

/*
@author: https://codepen.io/shamim539/pen/LKgpOr
 */

.main-div {
 margin: 0;
 padding: 0;
}
.box {
 position: fixed;
 top: 0;
 transform: rotate(80deg);
 left: 0;
 z-index: -1;
}

.wave {
 position: fixed;
 top: 0;
 left: 0;
 opacity: 0.4;
 position: absolute;
 top: 3%;
 left: 10%;
 background: #4e4e4e;
 width: 1500px;
 height: 1000px;
 margin-left: -150px;
 margin-top: -250px;
 transform-origin: 50% 48%;
 border-radius: 43%;
 animation: drift 10000ms infinite linear;
}

.wave.-three {
 animation: drift 11500ms infinite linear;
 position: fixed;
 background-color: #888888;
}

.wave.-two {
 animation: drift 8000ms infinite linear;
 opacity: 0.1;
 background: black;
 position: fixed;
}

.box:after {
 content: "";
 display: block;
 left: 0;
 top: 0;
 width: 100%;
 height: 100%;
 z-index: -1;
 transform: translate3d(0, 0, 0);
}

@keyframes drift {
 from {
  transform: rotate(0deg);
 }
 from {
  transform: rotate(360deg);
 }
}

.contain {
 animation-delay: 4s;
 z-index: 1000;
 position: fixed;
 top: 0;
 left: 0;
 bottom: 0;
 right: 0;
 display: -webkit-box;
 display: -ms-flexbox;
 display: flex;
 -ms-flex-flow: row nowrap;
 flex-flow: row nowrap;
 -webkit-box-pack: center;
 -ms-flex-pack: center;
 justify-content: center;
 -webkit-box-align: center;
 -ms-flex-align: center;
 align-items: center;

 background: #98b3bd;
 background: -webkit-linear-gradient(#717c81, #44464a);
 background: linear-gradient(#b0bfc4, #252728);
}

.icon {
 width: 100px;
 height: 100px;
 margin: 0 5px;
}

.icon:nth-child(2) img {
 -webkit-animation-delay: 0.2s;
 animation-delay: 0.2s;
}
.icon:nth-child(3) img {
 -webkit-animation-delay: 0.3s;
 animation-delay: 0.3s;
}
.icon:nth-child(4) img {
 -webkit-animation-delay: 0.4s;
 animation-delay: 0.4s;
}

.icon img {
 -webkit-animation: anim 2s ease infinite;
 animation: anim 2s ease infinite;
 -webkit-transform: scale(0, 0) rotateZ(180deg);
 transform: scale(0, 0) rotateZ(180deg);
}

@-webkit-keyframes anim {
 0% {
  -webkit-transform: scale(0, 0) rotateZ(-90deg);
  transform: scale(0, 0) rotateZ(-90deg);
  opacity: 0;
 }
 30% {
  -webkit-transform: scale(1, 1) rotateZ(0deg);
  transform: scale(1, 1) rotateZ(0deg);
  opacity: 1;
 }
 50% {
  -webkit-transform: scale(1, 1) rotateZ(0deg);
  transform: scale(1, 1) rotateZ(0deg);
  opacity: 1;
 }
 80% {
  -webkit-transform: scale(0, 0) rotateZ(90deg);
  transform: scale(0, 0) rotateZ(90deg);
  opacity: 0;
 }
}

@keyframes anim {
 0% {
  -webkit-transform: scale(0, 0) rotateZ(-90deg);
  transform: scale(0, 0) rotateZ(-90deg);
  opacity: 0;
 }
 30% {
  -webkit-transform: scale(1, 1) rotateZ(0deg);
  transform: scale(1, 1) rotateZ(0deg);
  opacity: 1;
 }
 50% {
  -webkit-transform: scale(1, 1) rotateZ(0deg);
  transform: scale(1, 1) rotateZ(0deg);
  opacity: 1;
 }
 80% {
  -webkit-transform: scale(0, 0) rotateZ(90deg);
  transform: scale(0, 0) rotateZ(90deg);
  opacity: 0;
 }
}
</style>
