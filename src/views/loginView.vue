<template>
  <v-app>
    <tool-bar></tool-bar> <!-- Header component -->

    <v-container>
      <v-form @submit.prevent="log">
        <v-text-field v-model="username" label="Nom d'utilisateur" required></v-text-field>
        <v-text-field v-model="password" label="Mot de passe" type="password" required></v-text-field>
        <v-alert v-if="msg" type="error">{{ msg }}</v-alert>
        <v-btn type="submit" color="primary">Login</v-btn>
      </v-form>

      <v-row>
        <v-col>
          <router-link to="/register">Inscrivez-vous</router-link>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import ToolBar from "@/components/toolBar.vue"; // Import your ToolBar component
import { mapActions } from "vuex";

export default {
  components: { ToolBar },
  data() {
    return {
      username: '',
      password: '',
      msg: ''
    };
  },
  methods: {
    // Dispatch login action when form is submitted
    async log() {
      if (this.username && this.password) {
        await this.login( { username: this.username, password: this.password });
        await this.$router.push('/')
      } else {
        this.msg = 'Veuillez remplir tous les champs'
      }
    },
    ...mapActions(['login']) // Map the login action from the store
  }
};
</script>
