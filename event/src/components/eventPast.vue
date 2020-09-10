<template>
    <div class="popup-wrap" v-if="showPastTime">
        <div class="popup-box transform-in">
            <div class="popbox-inside">
                <div class="msg">
                    <p class="MsgInfo" v-html="dialog.msg"></p>
                    <div class="dialogButtons">
                        <a @click="refresh()" class="dialog-cancel">確定</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import Vue from 'vue';

    export default {
        data: function() {
            return {
                showPastTime: this.showPastTime
            }
        },
        methods: {
            refresh: function refresh() {
                window.location.reload(true);
            },
        },
        props: [ 'dialog', 'showPastTime' ]
    }
</script>
