import Vue from 'vue';
import Vuex from 'vuex';
import {loginUser, registerUser} from "@/services/userService";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null,
        token: localStorage.getItem('token') || ''
    },
    getters: {
        isAuthenticated(state) {
            return !!state.token; // Returns true if token exists
        },
        getUser(state) {
            return state.user;
        }
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setToken(state, token) {
            state.token = token;
            localStorage.setItem('token', token); // Save token in localStorage
        },
        logout(state) {
            state.user = null;
            state.token = '';
            localStorage.removeItem('token'); // Remove token from localStorage
        }
    },
    actions: {
        async login({commit}, {username, password}) {
            try {
                //console.log("Données envoyées pour la connexion :", JSON.stringify({ username, password }));
                const response = await loginUser(username, password);
                if (response.error !== 1) {
                    //console.log("Response :",response.token)
                    commit('setUser', username);
                    commit('setToken', response.token);
                    return true;
                } else {
                    console.error("Erreur de connexion :", response);
                    return false;
                }
            } catch (error) {
                //console.error("Erreur de connexion (catch) :", error);
                return false;
            }
        },

        async register({commit}, {username, password}) {
            try {
                //console.log("Données envoyées pour l'inscription :", JSON.stringify({username, password}));
                const response = await registerUser(username, password);
                //console.log("Register response", response)
                commit('logout');
                return response
            } catch (error) {
                console.error("Erreur d'inscription (catch) :", error);
                return error;
            }
        },

        logout({commit}) {
            commit('logout');
            this.$router.push('/'); // Redirect to the homepage
        }
    },
    modules: {}
});
