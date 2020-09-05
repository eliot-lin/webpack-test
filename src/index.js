import Vue from 'vue';
import VueRouter from 'vue-router';
import event from './event.vue';

const router = new VueRouter();

new Vue({
    router,
    components: {event},
    template: '<event/>'
}).$mount('#app');
