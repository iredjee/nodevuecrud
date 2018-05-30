import Vue from 'vue';
import axios from 'axios';
import Notifications from 'vue-notification';
import router from './router';
import App from 'components/App';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

/**
 * Constants
 */
const API_URL = '/api/v1';

/**
 * Vue configuration
 */
Vue.use(BootstrapVue);
Vue.use(Notifications);
Vue.prototype.$http = axios.create({ baseURL: API_URL });

/**
 * App init
 */
new Vue({ el: '#root', router, components: { App }, template: '<App/>' });
