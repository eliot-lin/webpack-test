import Vue from 'vue';
import vueLoader from 'vue-loader';
import axios from 'axios';

<template>
    <div v-html="message"></div>
</template>

<script>
    export default {
        data: function() {
            return {
                message: 'hello vue'
            }
        },
    }
</script>

