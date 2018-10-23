// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import axios from 'axios'
import VueParticles from 'vue-particles'
Vue.use(VueParticles)
        
// router setup
import routes from './routes/routes'
import firebase from 'firebase'
// Plugins
import GlobalComponents from './globalComponents'
import GlobalDirectives from './globalDirectives'
import Notifications from './components/NotificationPlugin'

// MaterialDashboard plugin
import MaterialDashboard from './material-dashboard'

import Chartist from 'chartist'

Vue.config.productionTip = false


// configure router
const router = new VueRouter({
    mode: 'history',
    routes, // short for routes: routes
    linkExactActiveClass: 'nav-item active'
})



Vue.use(VueRouter)
Vue.use(MaterialDashboard)
Vue.use(GlobalComponents)
Vue.use(GlobalDirectives)
Vue.use(Notifications)

let app;

router.beforeEach((to, from, next) => {
    let currentUser = firebase.auth().currentUser;
    let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    if (requiresAuth && !currentUser) {
        if (to.meta.title) {
            document.title = to.meta.title + " | Native Rank Devsites"
        } else {
            document.title = to.name + " | Native Rank Devsites"
        }
        next('login')
    } else if (!requiresAuth && currentUser) {
        if (to.meta.title) {
            document.title = to.meta.title + " | Native Rank Devsites"
        } else {
            document.title = to.name + " | Native Rank Devsites"
        }
        next('dashboard')
    } else {
        if (to.meta.title) {
            document.title = to.meta.title + " | Native Rank Devsites"
        } else {
            document.title = to.name + " | Native Rank Devsites"
        }
        next()
    }
})



// Initialize Firebase
var config = {
    apiKey: "AIzaSyDB3suZNswQtMuPNsIiBhGiLT-PDk4xUcE",
    authDomain: "nrsites-18624.firebaseapp.com",
    databaseURL: "https://nrsites-18624.firebaseio.com",
    projectId: "nrsites-18624",
    storageBucket: "",
    messagingSenderId: "460443800049"
}


firebase.initializeApp(config)

/* eslint-disable */


firebase.auth().onAuthStateChanged(function(user) {
    if (!app) {
        /* eslint-disable no-new */
        /* eslint-disable */
        app = new Vue({
            el: '#app',
            render: h => h(App),
            router,
            data: {
                Chartist: Chartist,
                dSites: [],
                globalSiteList: [],
                globalRecentlyLaunched: [],
                globalActiveProjects: []
            },
            beforeCreate() {
                let user = firebase.auth().currentUser
                if (!user.emailVerified) {
                    user.sendEmailVerification().then(function() {
                        alert('Verification is required. A verification email was sent to ' + user.email);
                    }).catch(function(error) {
                        alert('OOps.. ' + error);
                    });
                    firebase.auth().signOut().then(() => {
                        this.$router.replace('login')
                    })
                }



                axios.get("https://www.nrdevsites.com/tracklivesites.json")
                    .then(response => {
                        this.globalRecentlyLaunched = response.data
                    })
                    .catch(err => {
                        alert(err.message)
                    })

                

                axios.get("https://www.nrdevsites.com/indexreactapp.php")
                    .then(response => {
                        this.globalActiveProjects = response.data
                    })
                    .catch(err => {
                        alert(err.message)
                    })

            },
            mounted() {
                axios.get("https://www.nrdevsites.com/servers/indexreactapp.php")
                    .then(response => {
                        this.dSites = response.data.data.serverNames
                        for (var serverName in this.dSites) {
                            for (var siteName in this.dSites[serverName].websites) {
                                this.globalSiteList.push(this.dSites[serverName].websites[siteName])
                            }
                        }
                    })
                    .catch(err => {
                        alert(err.message)
                    })
            }
        })
    }
});
