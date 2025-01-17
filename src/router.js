import Vue from 'vue'
import Router from 'vue-router'
import NewTask from './views/NewTask.vue'
import NewEmergency from './views/NewEmergency.vue'
import NewVolunteer from './views/NewVolunteer.vue'
import Emergency from './views/Emergency.vue'
import Task from './views/Task.vue'
import Volunteer from './views/Volunteer.vue'
import VolunteerSearch from'./views/VolunteerSearch.vue'
import home from './views/home.vue'
import Import from './views/Import.vue'
import Login from './components/login.vue'
import Register from './components/register.vue'


Vue.use(Router);
var router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        guest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        guest: true
      }
    },
    {
      path: '/',
      name: 'home',
      component: home,
    },
    {
      path: '/emergencies',
      name: 'emergency',
      component: Emergency,
    },
    {
      path: '/new-task',
      name: 'new-task',
      component: NewTask,
    
    },
    {
      path: '/new-emergency',
      name: 'new-emergency',
      component: NewEmergency,
    },
    {
      path: '/new-volunteer',
      name: 'new-volunteer',
      component: NewVolunteer,
    },
    {
      path: '/tasks',
      name: 'task',
      component: Task
    },
    {
      path:'/volunteers',
      name:'volunteer',
      component: Volunteer
    },
    {
      path: '/volunteers/search',
      name: 'volunteerSearch',
      component: VolunteerSearch
    },
    {
      path:'/import',
      name:'import',
      component: Import,
      meta: {
        requiresAuth: false,
        is_admin: false
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      let user = localStorage.getItem('user')
      if (to.matched.some(record => record.meta.is_admin)) {
        if (user.role == "coordinator") {
          next()
        }
        else {
          next({ name: 'emergency' })
        }
      } else {
        next()
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('jwt') == null) {
      next()
    }
    else {
      next({ name: 'emergency' })
    }
  } else {
    next()
  }
})


export default router;
