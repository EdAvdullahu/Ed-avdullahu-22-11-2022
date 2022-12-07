
import { defineStore } from "pinia";

export const useUserStore = defineStore("activeUser", {
    state() {
        return {
            users: JSON.parse(localStorage.getItem("users")),
            login: false,
        };
    },
    getters: {
        getUsers(state) {
            return state.users;
        },
        isLoggedIn(state){
            return state.login;
        }
    },
    actions: {
        logIn() {
            this.login = true;
        },
    },
});