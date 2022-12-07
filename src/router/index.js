import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import BasePage from "../pages/BasePage.vue";
import StudentsPage from "../pages/StudentsPage.vue";
import LoginPage from "../pages/LoginPage.vue";
import EditStudent from "../components/student/EditStudent.vue";
const routes = [
 {
  path: "/",
  component: BasePage,
  children: [
   {
    path: "",
    name: "Home",
    component: HomePage,
    auth: true,
   },
   {
    path: "students",
    name: "Students",
    component: StudentsPage,
    auth: true,
    children: [
     {
      name: "edit-student",
      path: ":studentIndex/edit-student",
      component: EditStudent,
      props: true,
     },
    ],
   },
  ],
 },
 {
  path: "/login",
  name: "Login",
  component: LoginPage,
 },
];

const router = createRouter({
 history: createWebHistory(process.env.BASE_URL),
 routes,
});

router.beforeEach(function (to, from, next) {
 const logedIn = JSON.parse(localStorage.getItem("login"));
 if (to.path !== "/login" && to.path !== "login" && !logedIn) {
  next({ path: "/login" });
 } else if ((to.path === "/login" || to.path === "login") && logedIn) {
  next({ path: "/" });
 } else {
  next();
 }
});

export default router;
