<template>
  <v-app>
    <!-- Header Section -->
    <toolBar></toolBar>

    <!-- Content Section (Empty for now) -->
    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <h1>Welcome to the Main Page</h1>
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
      // Redirect to login page (you can adjust this based on your routing setup)
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
