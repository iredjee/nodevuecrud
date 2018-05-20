import Vue from 'vue';
import App from 'components/App';
import router from './router';

new Vue({ el: '#root', router, components: { App }, template: '<App/>' });
