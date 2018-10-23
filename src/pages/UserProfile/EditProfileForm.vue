<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Edit Profile</h4>
        <p class="category">Complete your profile</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Company </label>
              <md-input v-bind:readonly="'readonly'" :value="'Native Rank'"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>User Name</label>
              <md-input v-model="username" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Email Address</label>
              <md-input v-model="emailadress" type="email"  v-bind:readonly="'readonly'"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>First Name</label>
              <md-input v-model="firstname" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Last Name</label>
              <md-input v-model="lastname" type="text"></md-input>
            </md-field>
          </div>
         
          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success" v-on:click="updateProfile">Update Profile</md-button>
          </div>
        </div>

      </md-card-content>
    </md-card>
  </form>
</template>
<script>
  import firebase from 'firebase'
export default {
  name: 'edit-profile-form',
  props: {
    dataBackgroundColor: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      username: null,
      disabled: null,
      emailadress: firebase.auth().currentUser.email,
      lastname: firebase.auth().currentUser.displayName.split(' ')[1],
      firstname: firebase.auth().currentUser.displayName.split(' ')[0],
      address: null,
      city: null,
      country: null,
      code: null,
      aboutme: ""
    }
  },
  methods: {
    updateProfile: function(){
      var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: this.firstname+' '+this.lastname,
      }).then(function() {
  alert('Profile Updated')
}).catch(function(error) {
  alert('Ooops.. ' + error);
});

    }
  }
}

</script>
<style>

</style>
