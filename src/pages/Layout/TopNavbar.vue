<template>
  <md-toolbar md-elevation="1" class="md-transparent">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <h3 class="md-title"  v-bind:class="{ 'site-name': $route.params.name}">{{$route.params.name ? $route.params.name : $route.name}}</h3>
      </div>
      <div class="md-toolbar-section-end">
        <md-button class="md-just-icon md-simple md-toolbar-toggle" :class="{toggled: $sidebar.showSidebar}" @click="toggleSidebar">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>

        <div class="md-collapse">
          <div class="md-autocomplete search-bar">
            <md-autocomplete class="search" v-model="selectedSite" :md-options="sites" v-on:md-selected="findSite(selectedSite)">
              <label>Search...</label>
            </md-autocomplete>
          </div>
        
          <md-list>
            <md-list-item to="/">
              <i class="material-icons">dashboard</i>
              <p class="hidden-lg hidden-md">Dashboard</p>
            </md-list-item>

            <md-list-item to="/notifications" class="dropdown">
              <drop-down>
                <a slot="title" class="dropdown-toggle" data-toggle="dropdown">
                  <i class="material-icons">notifications</i>
                  <span class="notification">5</span>
                  <p class="hidden-lg hidden-md">Notifications</p>
                </a>
                <ul class="dropdown-menu dropdown-menu-right">
                  <li><a href="#">Mike John responded to your email</a></li>
                  <li><a href="#">You have 5 new tasks</a></li>
                  <li><a href="#">You're now friend with Andrew</a></li>
                  <li><a href="#">Another Notification</a></li>
                  <li><a href="#">Another One</a></li>
                </ul>
              </drop-down>
            </md-list-item>

            <md-list-item to="/user">
              <i class="material-icons">person</i>
              <p class="hidden-lg hidden-md">Profile</p>
            </md-list-item>
          </md-list>
        </div>
      </div>
    </div>

  </md-toolbar>
</template>

<script>

export default{
  data () {
    return {
      selectedSite: null,
      sites: this.$root.$data.globalSiteList
    }
  },
  methods: {
    toggleSidebar () {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
    },
    findSite : function(selectedSite){
      this.$router.push({ name: 'Site', params: { name: selectedSite }})

    }
  }
}
</script>

<style lang="css">
.site-name
{
  text-transform: uppercase;
}

#search-site
{
  max-width:30px;
  margin:auto 0;
  cursor: pointer;
  margin-left:10px;
  color:#ccc;
  padding: 3px;
}

#search-site.active
{
  color:#f44336;
}

.search-bar .md-clear.md-input-action
{
color:#333!important;
background-color:transparent!important;
box-shadow:none;
}

.search-bar
{
  flex:auto;
  max-width:440px;
}
</style>
