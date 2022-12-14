// import { createStore } from "vuex";

// export default createStore({
//  state() {
//   return {
//    students: JSON.parse(localStorage.getItem("data")),
//    users: JSON.parse(localStorage.getItem("users")),
//   };
//  },
//  getters: {
//   students(state) {
//    return state.students;
//   },
//   studentList(state) {
//    return state.students;
//   },
//   getUsers(state) {
//    return state.users;
//   },
//   getStudentById: (state) => (id) => {
//    return state.students.find((x) => x.index === id);
//   },
//   userExists: (state) => (id) => {
//    const user = state.students.find((x) => x.index === id);
//    return typeof user !== "undefined";
//   },
//  },
//  mutations: {
//   deleteStudent(state, payload) {
//    const data = state.students;
//    const userIndex = data.findIndex((x) => x.index === payload.index);
//    if (userIndex !== -1) {
//     data.splice(userIndex, 1);
//     state.students = data;
//     localStorage.setItem("data", JSON.stringify(data));
//    }
//   },
//   editStudent(state, payload) {
//    const data = state.students;
//    const userIndex = data.findIndex((x) => x.index === payload.index);
//    data.splice(userIndex, 1, payload);
//    state.students = data;
//    localStorage.setItem("data", JSON.stringify(data));
//   },
//   addStudent(state, payload) {
//    const data = state.students;
//    data.unshift(payload);
//    state.students = data;
//    localStorage.setItem("data", JSON.stringify(data));
//   },
//   logIn() {
//    localStorage.setItem("activeUser", JSON.stringify(true));
//   },
//  },
//  actions: {
//   updateStudents(context, payload) {
//    context.commit("editStudent", payload);
//   },
//   deleteStudent(context, payload) {
//    context.commit("deleteStudent", payload);
//   },
//   addStudent(context, payload) {
//    context.commit("addStudent", payload);
//   },
//  },
//  modules: {},
// });

import { defineStore } from "pinia";

export const useStudentsStore = defineStore("students", {
 state() {
  return {
   students: localStorage.getItem("students"),
  };
 },
 getters: {
  getStudents(state) {
   return JSON.parse(state.students);
  },
  getStudentById: (state) => (id) => {
   return JSON.parse(state.students).find((x) => x.index === id);
  },
  userExists: (state) => (id) => {
   const user = JSON.parse(state.students).find((x) => x.index === id);
   return typeof user !== "undefined";
  },
 },
 actions: {
  deleteStudent(payload) {
   const data = JSON.parse(this.students);
   const userIndex = data.findIndex((x) => x.index === payload.index);
   if (userIndex !== -1) {
    data.splice(userIndex, 1);
   }
   this.students = JSON.stringify(data);
  },
  editStudent(payload) {
   const data = JSON.parse(this.students);
   const userIndex = data.findIndex((x) => x.index === payload.index);
   data.splice(userIndex, 1, payload);
   this.students = JSON.stringify(data);
  },
  addStudent(payload) {
   const data = JSON.parse(this.students);
   data.unshift(payload);
   this.students = JSON.stringify(data);
  },
 },
});
