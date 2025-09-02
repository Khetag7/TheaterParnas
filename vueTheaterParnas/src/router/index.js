import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Services from '@/views/TheaterParnasViews/Services.vue'
import Rent from '@/views/TheaterParnasViews/Rent.vue'
import Contacts from '@/views/TheaterParnasViews/Contacts.vue'
import AboutUs from '@/views/TheaterParnasViews/AboutUs.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/services',
      name: 'services',
      component: Services,
    },
    {
      path: '/rent',
      name: 'rent',
      component: Rent,
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: Contacts,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutUs,
    },
  ],
})

export default router
