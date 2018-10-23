<template>
  <md-card class="md-card-profile">
    <div class="md-card-avatar">
       <img class="img" v-on:click="changeImg" :src="photoUrl">
    </div>

    <md-card-content>
      <h6 class="category text-gray">Admin</h6>
      <h4 class="card-title">{{email}}</h4>
      <p class="card-description">
<!--      {{lastLogin}}
 -->      </p>
      <md-button class="md-round md-danger" v-on:click="logout"><md-icon>exit_to_app</md-icon>Logout</md-button>
    </md-card-content>
  </md-card>
</template>
<script>
import firebase from 'firebase'
export default {
  name: 'user-card',
  props: {
    cardUserImage: {
      type: String,
      default: require('@/assets/img/faces/john.jpg')
    }
  },
  methods:{
    logout: function(){
      firebase.auth().signOut().then(()  => {
        this.$router.replace('login')
      })
    },
    changeImg: function(){
      var user = firebase.auth().currentUser;
      var newUrl = prompt('New Image Url', this.photoUrl);
      user.updateProfile({
        photoURL: newUrl
      }).then(function() {
    location.reload()
}).catch(function(error) {
  alert('Ooops.. ' + error);
});
    }
  },
  data () {
    return {
      email : firebase.auth().currentUser.email,
      lastLogin : firebase.auth(),
      photoUrl : firebase.auth().currentUser.photoURL
    }
  }
}

</script>
<style>

</style>
