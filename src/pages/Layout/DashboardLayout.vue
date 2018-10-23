<template>
  <div class="wrapper">
    <notifications></notifications>

    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/dashboard">
        <md-icon>dashboard</md-icon>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/servers">
        <md-icon>dns</md-icon>
        <p>Servers</p>
      </sidebar-link>
      <sidebar-link to="/stats">
        <md-icon>insert_chart</md-icon>
        <p>Stats</p>
      </sidebar-link>
       <sidebar-link to="/dns">
        <md-icon>dns</md-icon>
        <p>DNS Lookup</p>
      </sidebar-link>
        <md-divider></md-divider>
         <sidebar-link to="/301checker">
        <md-icon>cached</md-icon>
        <p>301 Checker</p>
      </sidebar-link>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content>

      </dashboard-content>

      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.md-divider
{
  margin-top:10px;
}
</style>
<script>
import TopNavbar from './TopNavbar.vue'
import ContentFooter from './ContentFooter.vue'
import DashboardContent from './Content.vue'
import MobileMenu from '@/pages/Layout/MobileMenu.vue'

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu
  }
  }
</script>
