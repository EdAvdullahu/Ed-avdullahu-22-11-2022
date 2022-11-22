import { createApp } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";

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

localStorage.setItem("data", JSON.stringify(data));
localStorage.setItem("users", JSON.stringify(users));
localStorage.setItem("activeUser", JSON.stringify(false));

const app = createApp(App);
app.use(store);
app.use(router);
app.mount("#app");

import "bootstrap/dist/js/bootstrap.js";
