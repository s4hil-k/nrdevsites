import DashboardLayout from '@/pages/Layout/DashboardLayout.vue'

import Dashboard from '@/pages/Dashboard.vue'
import UserProfile from '@/pages/UserProfile.vue'
import TableList from '@/pages/TableList.vue'
import Typography from '@/pages/Typography.vue'
import Icons from '@/pages/Icons.vue'
import Notifications from '@/pages/Notifications.vue'
import Servers from '@/pages/Servers.vue'
import Site from '@/pages/Site.vue'
import Stats from '@/pages/Stats.vue'
import Dns from '@/pages/Dns.vue'
import Checker from '@/pages/Checker.vue' 

//Authentication

import Login from '@/components/Login.vue'
import SignUp from '@/components/SignUp.vue'
import firebase from 'firebase'



const routes = [{
        path: '/',
        component: DashboardLayout,
        redirect: '/dashboard',
        meta: {
            requiresAuth: true
        },
        children: [{
                path: 'dashboard',
                name: 'Dashboard',
                component: Dashboard,
                meta: {
                    title: "Dashboard"
                }
            },
            {
                path: 'servers',
                name: 'Servers',
                component: Servers,
            },
            {
                path: '/site/:name',
                component: Site,
                name: 'Site'
            },
            {
                path: '/stats',
                component: Stats,
                name: 'Stats'
            },
            {
                path: '/dns',
                component: Dns,
                name: 'DNS'
            },
            {
                path: 'user',
                name: 'User Profile',
                component: UserProfile
            },
            {
                path: '301checker',
                name: '301 Checker',
                component: Checker
            },
            {
                path: 'table',
                name: 'Table List',
                component: TableList
            },
            {
                path: 'typography',
                name: 'Typography',
                component: Typography
            },
            {
                path: 'icons',
                name: 'Icons',
                component: Icons
            },
            {
                path: 'notifications',
                name: 'Notifications',
                component: Notifications
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: SignUp
    }
]



export default routes
