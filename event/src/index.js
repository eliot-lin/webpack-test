import Vue from 'vue';
import router from 'vue-router';
import event from 'event/ae_other_casino.vue';

new Vue({
    router,
    components: {
        event,
    },
    template: '<event/>'
}).$mount('#app');
