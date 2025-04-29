<template>
  <v-app>
    <toolBar></toolBar>
    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <h1>Authentification avec JWT Caruhel Bourdin</h1>
            <h2 v-if="this.token === ''">Pas Authentifié</h2>
            <h2 v-if="this.token !== ''">Authentifié</h2>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ToolBar from "@/components/toolBar.vue";
import {mapState} from "vuex";

export default {
  name: 'MainPage',
  components: {ToolBar},
  methods: {
    goToLoginPage() {
      this.$router.push('/login');
    },

  },
  computed:{
    ...mapState(['token'])
  }
};
</script>

<style scoped>
/* You can add some custom styles if needed */
</style>
