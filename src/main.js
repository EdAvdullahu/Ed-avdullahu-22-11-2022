import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { createPinia } from "pinia";
import "bootstrap/dist/css/bootstrap.min.css";

const data = [
 {
  index: "1458",
  name: "Mergim Bajrami",
  doB: "1989-10-05",
  municipality: "Prishtine",
 },
 {
  index: "1452",
  name: "Blerton Rexha",
  doB: "1989-10-05",
  municipality: "Prishtine",
 },
 {
  index: "1461",
  name: "Abdullah Krasniqi",
  doB: "1989-10-05",
  municipality: "Prishtine",
 },
 {
  index: "1472",
  name: "Sami Salihu",
  doB: "1989-10-05",
  municipality: "Prishtine",
 },
 {
  index: "1491",
  name: "Visar Uruqi",
  doB: "1989-10-05",
  municipality: "Prishtine",
 },
 {
  index: "1232",
  name: "Naim Krasniqi",
  doB: "1989-10-05",
  municipality: "Prishtine",
 },
];
const users = [
 {
  username: "admin",
  password: "adminadmin",
 },
 {
  username: "user1",
  password: "p@ssw0rd",
 },
 {
  username: "user2",
  password: "11112222",
 },
];

localStorage.setItem("students", JSON.stringify(data));
localStorage.setItem("users", JSON.stringify(users));
localStorage.setItem("login", JSON.stringify(false));

const pinia = createPinia();
pinia.use(({store})=>{
 store.$subscribe((mutations)=>{
  localStorage.setItem(mutations.events.key, mutations.events.newValue);
 })
})

const app = createApp(App);
app.use(ElementPlus);
app.use(pinia);
app.use(router);
app.mount("#app");

import "bootstrap/dist/js/bootstrap.js";