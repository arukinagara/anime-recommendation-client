import Vue from 'vue';
import Router from 'vue-router';
import Recommendations from './components/Recommendations.vue';
import Ping from './components/Ping.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Recommendations',
      component: Recommendations,
    },
    {
      path: '/ping',
      name: 'Ping',
      component: Ping,
    },
  ],
});
