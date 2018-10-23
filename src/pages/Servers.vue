<template>
	<div class="content">
   
    Search <input name="query" v-model="query" @change="find">

    <div class="md-layout">
      <div class="md-layout-item md-xsmall-size-100 md-small-size-50 md-medium-size-33 md-large-size-25" v-if="sites" v-for="(server, serverID) in sites" >
        <md-card class="sitelist-card">
          <md-card-header data-background-color="blue">
            <h4 class="title">{{serverID}}   <span class="md-primary">{{server.websites.length}}</span></h4>
         
            <p class="category"> {{server.serverIP}}</p>
          </md-card-header>
          <md-card-content>
           <md-table>
	      <md-table-row slot="md-table-row" v-for="site in server.websites" v-on:click="findSite(site)">
	        <md-table-cell md-label="ID" class="dataCell">{{ site }}</md-table-cell>
	      </md-table-row>
    </md-table>
          </md-card-content>
        </md-card>

      </div>
  </div>
    {{searchSites}}

</div>
</template>

<script>
import axios from 'axios';

export default{
  data () {
    return {
      query: '',
    	sites : this.$root.$data.dSites,
      searchSites : this.$root.$data.globalSiteList
    }
  },
    mounted() {
	   if(this.sites.length == 0)
	   {
          axios.get("https://www.nrdevsites.com/servers/indexreactapp.php")
        .then(response => {this.$root.$data.dSites = response.data.data.serverNames
        	this.sites = response.data.data.serverNames

        })
        .catch(err => {
          alert(err.message)
        })
	   }
  },
  methods: {
    find : function(){
      find(this.query)
    },
    findSite : function(site){
      this.$router.push({ name: 'Site', params: { name: site }})

    }
  },
filters:{

}


}
</script>

<style scoped>
.sitelist-card .md-card-content
{
	max-height:400px;
	overflow:hidden;
	overflow-y: scroll;
}
.md-layout-item
{
	max-width: 20%
}
.md-card-header
{
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-weight: 600
}
.title
{
	font-weight: 900;
	margin: 0;
  display: flex;
  align-items:center;
}

span.md-primary
{
  background:rgba(0,0,0,0.2);
  border-radius: 50%;
  font-size:12px;
  text-align: center;
  width:25px;
  height:25px;
  margin-left:10px;
  display: flex;
  justify-content: center;
}

.md-theme-default :not(input):not(textarea)::selection {
    background-color: red!important;
}

tr
{position: relative;
cursor: pointer;}

</style>
