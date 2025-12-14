import Vue from "vue";
import axios from "axios";

Vue.prototype.$axios = axios;

// Si quieres una instancia con baseURL
const api = axios.create({ baseURL: "https://api.example.com" });
Vue.prototype.$api = api;
