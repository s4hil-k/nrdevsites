<template>
  <div class="content">  
  <md-card>
    
        <md-card-header data-background-color="blue">
          <md-progress-bar md-mode="query"></md-progress-bar>
            <a class="title" :href="'http://www.' + $route.params.name" target="_blank"> {{$route.params.name}}</a>
            
   </md-card-header>
   <md-card-content>
    <div class="md-layout md-gutter">
    <div class="md-layout-item"></div>
    <div class="md-layout-item md-size-25">
     
      <div class="iphone">
        <div class="ss-container">

        <img :src="screenshotURL" class="loading" id="iphoneImage"></div>
      </div>
<div class="page-speed-container"><span>Page Speed Score :</span><span v-bind:style="{color:pageSpeedColor}">{{mobileScore}}</span></div>
  </div>
</div>
   </md-card-content>
          </md-card>
      </div>
</template>

<script>

import axios from 'axios'

export default{
  data() {
    return {
      screenshotURL: require('@/assets/img/logo.svg'),
      siteName : this.$route.params.name,
      mobileScore: '',
      pageSpeedColor: '#dd4b39',
    }
  },
  mounted() {
    axios.get("https://www.googleapis.com/pagespeedonline/v4/runPagespeed?screenshot=true&strategy=mobile&url=https://www."+this.siteName)
        .then(response => {
           var element = document.getElementById("iphoneImage")
           element.className = element.className.replace(/\bloading\b/g, "")
         this.screenshotURL = this.generateImg(response.data.screenshot.data)
         this.mobileScore = response.data.ruleGroups.SPEED.score
         if(this.mobileScore > 69){
          this.pageSpeedColor = "#009a2d"
         }
        })
        .catch(err => {
          console.log(err.message)
        })
  },
  methods : {
    generateImg : function(base64) {
        base64 = base64.replace(/_/g, '/')
        base64 = base64.replace(/-/g, '+')
        base64 = "data:image/jpeg;base64," + base64
        return base64
    }
  }
}
</script>
<style scoped>


.md-card-header
{
  position:relative;
  }
.md-progress-bar-track:after {
    background-color: #26c6da!important;
}

.md-progress-bar
{
    position: absolute!important;
    top: 5px;
    left: 0;
    right: 0;
}


.iphone
{
  background:url(../assets/img/iphone_bg.png) no-repeat;
  background-size: contain;
    float: right;
    height: 510px;
    position: relative;
    width: 250px;
}


.iphone .ss-container
{
  width: 215px;
    height: 372px;
    clip: rect(0,215px,375px,0);
    top: 59px;
    left: 17px;
    right: 13px;
    position: relative;
    overflow:hidden;
}
.iphone img
{
    position: absolute;
    width: 100%;
    height: auto;
    top: 0;
    left: 0;
    z-index: 1;
    border-radius:1px;
}

.iphone img.loading
{padding: 80px;
    opacity: 0.5;}
.page-speed-container
{
  width: 250px;
  background: #f8f8f8;
    padding: 10px 16px;
    float: right;
    color:#575757;
    font-size:20px;
    font-weight: 700;
    display: flex;
    align-items:center;
    justify-content: space-between;
}

.title
{
  font-size:18px;
  font-weight: 600;
  margin-bottom:-7px!important;
  letter-spacing: 2px;
  position: relative;
   display: inline-block;
   overflow:hidden;
}

.title:after
{
  
  bottom:0;
  content:'';
  display:block;
  height:2px;
  width: 100%;
  background:#f44336;
  transform:translateX(-100%);
  transition:.2s;
}

.title:hover:after
{
  transform:translate(0);
}
</style>
