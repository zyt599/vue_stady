import Vue from 'vue';
import Router from 'vue-router';
import routes from '@/components/resource';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'routes',
      component: routes
    }
  ]
});
