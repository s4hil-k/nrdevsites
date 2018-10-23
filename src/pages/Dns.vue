<template>
	 <div id="content">
<div id="searchBackground" style="background:linear-gradient(to right, #006AA5, #007DC2);">

			<div class="c_wrapper">
					<h2 class="text-center">DNS Lookup</h2>
		 <md-field md-inline class="search-section">
      <md-icon>link</md-icon>
      <label>Enter domain (example.com)</label>
      <md-input v-model="fullSiteAddress" @keyup.enter="fetchSite()" autofocus></md-input>
 <md-button style="background: #FFC60B!important;color:#333!important;" class="search" @click="fetchSite()"> <md-icon>search</md-icon></md-button>
    </md-field>
    
    </div>
		
	<vue-particles color="#fff" :particleOpacity="0.3" :particlesNumber="70" shapeType="circle" :particleSize="5" linesColor="#fff" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150" :moveSpeed="2" :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push"></vue-particles>

	<div class="card-result" v-if="this.result != ''">

		<b>Registrar</b>	<input v-model="registrar" class="result" readonly  @focus="$event.target.select()">
		<hr>
		<b>A Record</b>	<input v-model="result" class="result" readonly @focus="$event.target.select()">
		<hr>
		<b>Hosting Company</b>	<input v-model="hosting" class="result" readonly  @focus="$event.target.select()">
		<hr><h4 :style="{background:'#ccc', padding: '0 10px', display: 'flex', justifyContent:'space-between'}"><span>DNS Management</span><input v-model="dnsManagement" class="result" readonly @focus="$event.target.select()"></h4>
		<div class="nameserver_wrap">
		<b>Name Servers</b><div class="nameservers"><input v-for="ns in nameServers" :value="ns" class="result" readonly  @focus="$event.target.select()">
		</div>
  </div>
    <hr><h4 :style="{background:'#ccc', padding: '0 10px', display: 'flex', justifyContent:'space-between'}"><span>Email Host</span><input v-model="emailHost" class="result" readonly @focus="$event.target.select()"></h4>
     <div v-if="godaddyManage != ''" class="manage"><b>Managed At</b> <input v-model="godaddyManage" class="result" readonly  @focus="$event.target.select()"></div>
    <div class="nameserver_wrap" v-if="mxRecords != ''">
    <b>MX Records</b><div class="nameservers"><input v-model="mxRecords" class="result" readonly  @focus="$event.target.select()">
    </div>

	</div>
		</div>
		</div>

		
    </div>
</template>

<script>
	//https://dns.google.com/resolve?name=google.com

	import axios from 'axios';

export default {
data () {
    return {
    	fullSiteAddress: '',
    	result: [],
    	siteAddress: '',
    	hosting: '',
    	registrar: '',
    	nameServers: {},
      dnsManagement: '',
      mxRecords: '',
      emailHost: '',
      godaddyManage: ''
      }
    },
  methods: {
  	fetchSite: function(){
  		 axios.get("https://dns.google.com/resolve?name="+this.siteAddress)
        .then(response => {
        	this.result = response.data.Answer[0].data
        	this.fetchHosting()
        })
        .catch(err => {
          alert(err.message)
        })
      this.godaddyManage = ''

axios.get("https://www.nrdevsites.com/whois.php?domain="+this.siteAddress)
        .then(response => {
        	this.registrar = response.data.Registrar
        	this.nameServers = response.data.nameservers
          this.getARecord(this.nameServers[0])
        })
        .catch(err => {
          alert(err.message)
        })

        axios.get("https://dns.google.com/resolve?name="+this.siteAddress+"&type=MX")
        .then(response => {

          if(!response.data.Answer)
          {
             this.emailHost = 'EMAIL SERVICES ARE NOT SETUP'
        
        } else
        {
           this.mxRecords = response.data.Answer[0].data
          this.getMXARecord(this.mxRecords);
        }
        })
        .catch(err => {
          alert(err.message)
        })


  	},

    getARecord: function(domain){
        axios.get("https://dns.google.com/resolve?name="+domain)
        .then(response => {
          this.getNSCompany(response.data.Answer[0].data)
        })
        .catch(err => {
          alert(err.message)
        })
    },

    getMXARecord: function(domain){
        axios.get("https://dns.google.com/resolve?name="+this.removeFirstWord(domain))
        .then(response => {
          this.getMXCompany(response.data.Answer[0].data)
        })
        .catch(err => {
          alert(err.message)
        })
    },


    getNSCompany: function(arecord){
    axios.get("https://ipinfo.io/" + arecord+ "/json?token=a1d0e24eceadba")
        .then(response => {
          this.dnsManagement = this.removeFirstWord(response.data.org)
        })
        .catch(err => {
          alert(err.message)
        })
    },
    getMXCompany: function(arecord){
    axios.get("https://ipinfo.io/" + arecord+ "/json?token=a1d0e24eceadba")
        .then(response => {
          this.emailHost = this.removeFirstWord(response.data.org)
          var mailA = ''
          if(this.emailHost.includes('Microsoft'))
          {
          axios.get("https://dns.google.com/resolve?name=mail."+this.siteAddress)
          .then(response => {
            console.log(response.data.Status)
            if(response.data.Status == 0)
            {
              mailA = response.data.Answer[1].data
            } else
            {
              mailA = ''
            }
            
            if (mailA != '') {
                axios.get("https://ipinfo.io/" + mailA + "/json?token=a1d0e24eceadba")
            .then(response => {
             this.godaddyManage = this.removeFirstWord(response.data.org)
            })
            .catch(err => {
              alert(err.message)
            })
            }
        
          })
          .catch(err => {
            alert(err.message)
          })
          }
        })
        .catch(err => {
          alert(err.message)
        })
    },


  	removeFirstWord: function(original)
  	{
  			var result = original.substr(original.indexOf(" ") + 1)
  			return result
  	},

  	fetchHosting: function(){
  		axios.get("https://ipinfo.io/" + this.result + "/json?token=a1d0e24eceadba")
        .then(response => {
        	this.hosting = this.removeFirstWord(response.data.org)
        })
        .catch(err => {
          alert(err.message)
        })
  	}
  },
  watch: {
  	fullSiteAddress: function(newValue){
  		this.fullSiteAddress = newValue.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0]
  		this.siteAddress = this.fullSiteAddress
  	}
  }



}


</script>

<style lang="scss" scoped>
	
#searchBackground
{
	   position: relative;
    height: auto;
    padding-bottom: 40px;
}

#particles-js
{
	position: absolute;
    top: 0;
    left: 0;
    bottom:0;
    right:0;
}

.c_wrapper
{
	padding: 30px;
    border-radius: 8px;
    height: auto;
    max-width: 700px;
    margin: auto;
    position: relative;
    z-index: 2;
	h2
	{
		color:#fff;
		font-weight:800;
		letter-spacing:1px;
	}
    .search-section
    {
    background: #fff;
    min-height: 0;
	padding:5px;
    margin: 0;
    margin-right: 15px;
    border-radius: 0px;
    }

	.md-field>.md-icon:after
	{
		content:none;
	}

	.md-icon{margin: auto;color:#333!important;}
	.search-section label
	{
	top:50%!important;
	transform:translateY(-50%)!important;
	left: 41px!important;
	}

	.md-button
	{
		position: absolute;
		right:0;
		top:0;
		bottom:0px;
		border-radius:0px;
	
		margin:0;
	}
}
.card-result
{
    background: #fafafa;
    border-radius: 0 0 3px 3px;
    border-top: 1px solid #e3e3e3;
    max-width:640px;
    margin:auto;
    padding:30px;
    position: relative;
    z-index:99;
    font-weight:600;
    letter-spacing:1px;
    b
    {
    color: #6a6a6a;
    background: #fff;
    border: 1px solid #e3e3e3;
    border-radius: 11px;
    height: 22px;
    line-height: 20px;
    padding: 0 12px;
    display: inline-block;
    margin-right: 20px;
    width:160px;
    text-align:center;

    }
    hr{
    	border-color:rgba(0,0,0,0.04);
    	margin-top:20px;
    	margin-bottom:20px;
    }
}

input.result
{
	font-size:18px;
	color:#333;
	border:none;
	background:none;
	    width: 100%;
    max-width: 400px;
}

.nameservers
{

	background:#fff;
	    border: 1px solid #e8edf0;
	    padding:10px;
	    display:inline-grid;
      min-width:400px;
      max-width:100%;
input{
	font-size:14px;
	margin-top:4px;

}
}

.nameserver_wrap
{

	b{
		white-space:nowrap;
		 width:160px;
		 vertical-align:top;
	}
}

h4
{
  input.result
  {
    color:#f44336;
    text-align:right;
  }
}
.manage
{
  padding:10px 10px;
  width:100%;
  display:flex;
  align-items:center;
  background:#ECF3F8;
  margin-bottom:10px;
}
</style>
