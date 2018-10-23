<template>
  <div class="content">
   
    <div class="md-layout">
      <div class="md-layout-item md-xsmall-size-100 md-small-size-50 md-medium-size-33 md-large-size-25 md-xlarge-size-25" v-for="site in activeProjects">
        <a :href="'https://www.nrdevsites.com/'+site" :target="'_blank'" class="projectLink">
        <site-card
        :dataImg="'https://www.nrdevsites.com/sites/screenshot/images/'+site+'.png'">
          <template slot="content">
            <h4 class="title projectTitle">{{site}}</h4>
              <p class="category text-center">
                <span class="text-success"><i class="fas fa-check"></i> Active Project </span> 
              </p>
          </template>

        </site-card>
      </a>
      </div>
      
    </div>
    <md-divider/>
    <br/>
     <div class="md-layout">

     <div class="md-layout-item md-xsmall-size-100 md-small-size-100 md-medium-size-50 md-size-50">
        <md-card class="sitelist-card">
          <md-card-header data-background-color="green">
            <h4 class="title"><b> <md-icon>trending_up</md-icon> Upgrades</b></h4>
         
            <p class="category"> </p>
          </md-card-header>
          <md-card-content>
<div class="md-layout">
        <div class="md-layout-item md-xsmall-size-100 md-small-size-50 md-medium-size-33 md-large-size-33 md-xlarge-size-33" v-for="site in upgradeProjects">
            <a :href="'https://www.nrdevsites.com/'+site" :target="'_blank'">
<md-card class="site-card">
  <md-card-media-cover md-text-scrim>
    <md-card-media md-ratio="4:3">
      <img :src="'https://www.nrdevsites.com/sites/screenshot/images/'+site+'.png'">
    </md-card-media>

    <md-card-area>
      <md-card-header>
        <div class="md-subhead text-center">{{site}}</div>
      </md-card-header>

    </md-card-area>
  </md-card-media-cover>
</md-card>
</a>
  </div>         

</div>

          </md-card-content>
        </md-card>
      </div>



<div class="md-layout-item md-xsmall-size-100 md-small-size-100 md-medium-size-50 md-size-50 recently-launched">
        <md-card class="sitelist-card">
          <md-card-header data-background-color="blue">
            <h4 class="title"><b> <md-icon>airplanemode_active</md-icon> Recentently Launched</b></h4>
        
          </md-card-header>
          <md-card-content :style="{    maxHeight: '220px',
    overflow: 'hidden'}">


           <md-table>
        <md-table-row slot="md-table-row" v-for="(date , site) in reverseObject" :key="site" class="recently-launched-row">
          <md-table-cell md-label="ID">{{ site }} <span class="date">{{date}}</span></md-table-cell>

        </md-table-row>
    </md-table>
    </md-card-content>
        </md-card>
      </div>


       <div class="md-layout-item md-xsmall-size-100 md-small-size-100 md-medium-size-50 md-size-50">
        <md-card class="sitelist-card">
          <md-card-header data-background-color="green">
            <h4 class="title"><b> <md-icon>cached</md-icon> Updates</b></h4>
         
            <p class="category"> </p>
          </md-card-header>
          <md-card-content>
<div class="md-layout">
        <div class="md-layout-item md-xsmall-size-100 md-small-size-50 md-medium-size-33 md-size-33" v-for="site in updateProjects">
            <a :href="'https://www.nrdevsites.com/'+site" :target="'_blank'">
<md-card class="site-card">
  <md-card-media-cover md-text-scrim>
    <md-card-media md-ratio="4:3">
      <img :src="'https://www.nrdevsites.com/sites/screenshot/images/'+site+'.png'">
    </md-card-media>

    <md-card-area>
      <md-card-header>
        <div class="md-subhead text-center">{{site}}</div>
      </md-card-header>

    </md-card-area>
  </md-card-media-cover>
</md-card>
</a>
  </div>         

</div>

          </md-card-content>
        </md-card>
      </div>
      
    </div>
  </div>

</template>

<script>
  import axios from 'axios';
import {
  SiteCard,
  NavTabsCard,
  NavTabsTable,
  OrderedTable
} from '@/components'


export default{
  components: {
    SiteCard,
    NavTabsCard,
    NavTabsTable,
    OrderedTable
  },
  data () {
    return {
      allSites: [],
      activeProjects:[],
      upgradeProjects: [],
      updateProjects: [],
      liveSites : []
    }
  },

  computed :
  {
    reverseObject:    function(object) {

        object = this.liveSites
        var newObject = {}
        var keys = []
        for (var key in object) {
            keys.push(key)
        }
        for (var i = keys.length - 1; i >= 0; i--) {

          var value = object[keys[i]]
          newObject[keys[i]]= value
        }       

        return newObject
      }
  },
  mounted(){
      axios.get("https://www.nrdevsites.com/indexreactapp.php")
                    .then(response => {
                        this.allSites = response.data
                        this.activeProjects = response.data.wordpress
                        this.upgradeProjects = response.data.upgrade
                        this.updateProjects = response.data.update
                    })
                    .catch(err => {
                        alert(err.message)
                    })

                    axios.get("https://www.nrdevsites.com/tracklivesites.json")
                    .then(response => {
                        this.liveSites = response.data
                    })
                    .catch(err => {
                        alert(err.message)
                    })
  }
 
      
}
</script>


<style lang="scss" scoped>
a.projectLink:hover .md-card .md-card-header
{
  background-position-y: 100%;
}
.title
{
  text-align: center;
    text-transform: uppercase;
    margin: 0!important;
    magrin-top:10px!important;
    font-weight:400;
    letter-spacing:1px;

}
.site-card .md-card-media-cover .md-card-area
{
  bottom:-14px;
}

.site-card.md-card .md-card-header {
    -webkit-box-shadow: 0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
    box-shadow: 0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
    margin: -10px 15px 0;
    border-radius: 3px;
    padding: 5px 15px;
    background-color: #4caf50;
    text-transform:uppercase;
  
    & .md-subhead
    {
    font-weight:600!important;
    letter-spacing:1.4px!important;
  }
}

.site-card
{
  .md-card-backdrop
  {
    opacity:.4
  }
}

.recently-launched-row td div
{
  justify-content:space-between;
  cursor: pointer;
}


.date{
    position: absolute;
    transition: .3s cubic-bezier(.4,0,.2,1);
    display: -webkit-box;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    right: -4px;
    font-size: 10px;
    font-style: normal;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    color: #fff;
    pointer-events: none;
    z-index: 7;
    position: relative;
    top: 0;
    bottom: 0;
    right: 0;
    width: auto;
    border-radius: 3px;
    height: 18px;
    padding: 0 4px;
    color: #fff;
    color: var(--md-theme-demo-light-text-primary-on-accent,#fff);
    background-color: #ff5252;
    font-weight:600;
}
</style>

