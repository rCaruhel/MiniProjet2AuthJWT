<template>
  <v-app-bar app>
    <v-toolbar-title @click="$router.push('/')">Menu</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn v-if="this.token === ''"  color="primary" @click="$router.push('/register')">S'inscrire</v-btn>
    <v-btn v-if="this.token === ''" color="primary" @click="$router.push('/login')">Se connecter</v-btn>
    <v-btn v-if="this.token !== ''" color="primary" @click="logOut">Déconnexion</v-btn>
  </v-app-bar>
</template>



<script>
import {mapActions, mapState} from "vuex";
export default {
  name: 'toolBar',
  components: {},
  methods: {
    ...mapActions(['logout']),
    logOut() {
      // Logout the user
      this.logout()
    }
  },
  computed:{
    ...mapState(['token'])
  }
};
</script>

<style scoped>

</style>