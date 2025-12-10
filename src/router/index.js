import { createRouter, createWebHistory } from 'vue-router'
import SagaMenu from '../components/navigation/SagaMenu.vue'
import TimelineView from '../components/timeline/TimelineView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: SagaMenu
    },
    {
      // This :filter param will capture 'infinity', 'phase-1', 'super-chrono', etc.
      path: '/timeline/:filter',
      name: 'timeline',
      component: TimelineView,
      props: true
    }
  ]
})

export default router