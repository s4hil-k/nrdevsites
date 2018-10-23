<template>
 <!--   <md-content>
  <div class="login">
    <h3>Sign In</h3>
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <button v-on:click="login">Connection</button>
    <p>You don't have an account ? You can create one.</p>
  </div>
</md-content> -->
<div class="text-center">
<md-card>
      <md-card-area md-inset>
        <md-card-media md-ratio="16:9">
          <img src="../assets/img/nrhq.jpg" alt="Coffee House">
        </md-card-media>

        <md-card-header class="card-header">
          <h2 class="md-title">Native Rank</h2>
        </md-card-header>

      </md-card-area>

      <md-card-content>
     <h3 class="md-subheading">Login</h3>

    <md-field md-clearable>
      <md-icon>person</md-icon>
      <label>Username</label>
      <md-input v-model="email" v-on:keyup.13="login"></md-input>


    </md-field>
    <md-field>
       <md-icon>lock</md-icon>
      <label>Password</label>
      <md-input v-model="password" type="password" v-on:keyup.13="login"></md-input>
    </md-field>
  <div id="error" v-if="error" class="alert-danger">{{error}}</div>
      </md-card-content>

      <md-card-actions>
         <router-link to="/signup" v-bind:style="{marginRight:'8px'}">New User ?</router-link><md-button class="md-primary" v-on:click="login">Login</md-button>
       
       
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
  import firebase from 'firebase'
  export default {
    name: 'login',
    data: function() {
      return {
        email: '',
        password: '',
        error: ''
      }
    },
    methods: {
      login: function(){
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(
          (user) => {
            this.$router.replace('dashboard');
          },
          (err) => {
            this.error = err.message;
          }    
        );
      }
    }
  }
</script>

<style scoped>  /* "scoped" attribute limit the CSS to this component only */
 .md-input
 {
  padding-left:10px;
 }
   .md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }

  .md-primary
  {
    display: flex
  }

  .card-header
  {
    background:#f44336!important;
    position: relative;
    z-index: 2;
   
  }
   .md-title{
      color:#fff;
    }
    .alert-danger
    {color: red}
    .md-button-content
    {
      display: flex
    }
</style>
