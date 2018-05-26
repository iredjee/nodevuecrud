import Vue from 'vue';
import App from 'components/App';
import router from './router';
import styles from './styles';

new Vue({ el: '#root', router, components: { App }, template: '<App/>' });
