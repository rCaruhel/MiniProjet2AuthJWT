<template>
  <v-app>
    <tool-bar></tool-bar> <!-- Header component -->


    <v-container>
      <h1>Register : </h1>

      <v-form @submit.prevent="handleRegister">
        <v-text-field v-model="userName" label="Nom d'utilisateur" required></v-text-field>
        <v-text-field v-model="passWord" label="Mot de passe" type="password" required></v-text-field>

        <!-- Affichage du message d'erreur -->
        <v-alert v-if="msg" type="error">{{ msg }}</v-alert>

        <v-btn type="submit" color="primary">S'inscrire</v-btn>
      </v-form>
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
      userName: '',
      passWord: '',
      msg: '' // Message d'erreur initialement vide
    };
  },
  methods: {
    ...mapActions(['register',"login"]), // Map Vuex action

    async handleRegister() {
      if (this.userName && this.passWord) {
        try {
          // Appel à l'action Vuex pour l'inscription
          let response = await this.register({ username: this.userName, password: this.passWord });
          //console.log("response register : ",response)
          //await this.login({ username: this.userName, password: this.passWord });
          // Si l'inscription réussie, on peut vider le message d'erreur (s'il y en a un)
          if(response.error) {
            this.msg = response.data.message
          }
          else{
            this.msg = "Compte crée avec succès, redirection vers la page de connexion"
            //attente de 2 secondes avant de rediriger
            setTimeout(() => {
              this.$router.push('/login')
            }, 2000);

          }


          // Réponse réussie, redirection si besoin
          //await this.$router.push('/'); // Décommente si tu veux rediriger après inscription
        } catch (error) {
          // Gestion de l'erreur
          // Vérifie que 'error' a bien un message à afficher
          //console.log("error",error)
          this.msg = error
        }
      } else {
        // Si les champs sont vides, on affiche un message spécifique
        this.msg = 'Veuillez remplir tous les champs';
      }
    }
  }
};
</script>
