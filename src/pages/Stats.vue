<template>
	<div class="content">
		<div id="site-stats-header">
			<div class="z-index">
			<h2 class="text-center">Enter A Website to Get the Stats</h2>
			<div class="wrapper">
		 <md-field md-inline class="search-section">
      <md-icon>search</md-icon>
      <label>Enter Webpage URL</label>
      <md-input v-model="siteAddress" @keyup.enter="fetchSite()"></md-input>

    </md-field>
     <md-button class="md-raised md-primary search" @click="fetchSite()">Search</md-button>
    </div>
</div>
</div>

 <div class="md-layout-item md-layout md-gutter">
        <div class="md-layout-item md-xsmall-size-100 md-small-size-50 md-medium-size-33 md-large-size-25 md-xlarge-size-25 stat-item" v-for="data in sortedData">
        	  <md-card class="md-primary">

        <md-card-header>
          <div class="md-title">{{techNames[data.name]}}</div>
          <div class="md-subhead"><i class="material-icons">
cached
</i> <span>{{timeConverter(data.latest)}} <md-tooltip md-direction="right">Last Updated</md-tooltip></span>

</div>
        </md-card-header>

        <md-card-content>
          <ul>
          	<li v-for="cName in data.categories">{{techNames[cName.name]}}</li>
          </ul>
          <span v-if="data.categories.length < 1"> 

			<div class="alert alert-danger">
				<span><b> No {{techNames[data.name]}} data found</b></span>
			</div>
          	<md-chip>{{techNames[data.name]}} helps with the site speed</md-chip></span>
        </md-card-content>

    </md-card>

        </div>
      </div>


	<!-- end content -->
	</div>
</template>

<script>
	import axios from 'axios';
	import json from '../assets/definitions.json'
export default {
  data () {
    return {
    	siteAddress: '',
    	results: '',
    	loading: true,
    	allData: [],
    	definitions: json,
    	techNames: []
      }
    },
  methods: {
  	fetchSite: function(){
  		 axios.get("https://api.builtwith.com/free1/api.json?KEY=d16d1354-3b1c-4dd2-bb2b-584fe4046d4e&LOOKUP="+this.siteAddress)
        .then(response => {
        	this.allData = []
        	this.results = response.data
        	var results = this.results

  		for(var d in results.groups)
		{
		this.allData.push(results.groups[d])
		}
        })
        .catch(err => {
          alert(err.message)
        })
  	},
  	timeConverter: function(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year ;
  return time;
},
getNameFromId: function(id){
		 
}
  },
  computed: {
  	sortedData: function() {
    function compare(a, b) {
      if (a.name < b.name)
        return -1;
      if (a.name > b.name)
        return 1;
      return 0;
    }

    return this.allData.sort(compare);
  }
  },
  mounted() {
  	for(var def in this.definitions)
  	{
  		this.techNames[this.definitions[def].Id] = this.definitions[def].Name
  		for(var subdef in this.definitions[def].SubCategories)
  		{
  			this.techNames[this.definitions[def].SubCategories[subdef].Id] = this.definitions[def].SubCategories[subdef].Name
  		}

  	}
  }
}

</script>

<style scoped>

#site-stats-header
{
	background:#fff;
	padding:60px;
}

.search-section
{
	background:#fff;
	padding:0;
	min-height: 0;
	padding:5px;
	margin:0;
	margin-right: 15px;
}

.md-field>.md-icon:after
{
	content:none;
}
.search-section label
{
top:50%!important;
transform:translateY(-50%)!important;
left: 41px!important;
}
.wrapper
{
	padding:30px;
	border-radius:8px;
	height: auto;
	max-width:700px;
	margin:auto;
	background:#ccc;
	    display: flex;
    align-items: center;
}
h2
{
	font-weight:800;
	color:#333;
	letter-spacing: 1px;
}
.z-index
{
	position: relative;
	z-index:1;
}

#site-stats-header
{
	    background: url(../assets/img/abstract.png);
    background-size: cover;
    background-position: center;
    position: relative;
}

#site-stats-header:after
{
position:absolute;
top:0;
left:0;
right:0;
bottom:0;
background:#f4f4f4;
content:'';
opacity:.1;
z-index:0;
}

.md-button.search, .md-button.search:hover
{
	background:#f44336!important;
}
	
</style>

<style lang="scss" scoped>
	.stat-item
	{
		.md-card-header
		{
			margin:0;
			box-shadow:none;
			background:linear-gradient(60deg, #66bb6a, #43a047);
			text-transform:uppercase;
			text-align:center;
			.md-title
			{
				font-size:20px;
			}
		}

		.md-card-content
		{
			background:#fff;
			color:#575757
		}
	}

	.md-subhead{
		color:#FEC53F;
		opacity:.9;
	.material-icons
	{
		line-height:inherit;
		vertical-align:middle;
		margin-right:6px;
	}
		span{
			color:#FECE59;
			font-weight:900;
		}
	}
</style>
