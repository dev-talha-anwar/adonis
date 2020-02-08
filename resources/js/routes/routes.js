import Vue from 'vue'
import Router from 'vue-router'
import user from '@/routes/user';
import website from '@/routes/website';
Vue.use(Router)
const routes = [];
export default new Router({
    mode: 'history',
    routes: routes.concat(user,website)
})
