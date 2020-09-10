<template>
    <div class="popup-wrap" v-if="show">
        <div class="popup-box transform-in">
            <div class="popbox-inside">
                <div class="msg" v-if="dialog.success==1">
                    <h2 class="MsgTitle" v-html="dialog.title"></h2>
                    <p class="MsgInfo" v-html="dialog.msg"></p>
                    <!-- 按鈕幾顆都會置中 -->
                    <div class="dialogButtons">
                        <a @click="refresh()" class="dialog-cancel">確定</a>
                    </div>
                </div>

                <div class="msg" v-else>
                    <h2 class="MsgTitle2" v-html="dialog.title"></h2>
                    <p class="MsgInfo" v-html="dialog.msg"></p>
                    <!-- 按鈕幾顆都會置中 -->
                    <div class="dialogButtons">
                        <a @click="closeDialog()" class="dialog-cancel">確定</a>
                        <a @click="goPlayCasino()" class="dialog-ok">馬上玩</a>
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
                show: this.show
            }
        },
        methods: {
            closeDialog: function closeDialog() {
                this.show = false;
            },
            refresh: function refresh() {
                window.location.reload(true);
            },
            goPlayCasino: function goPlayCasino() {
                window.location = "gamesofa://script?type=" + 88 + "&urlLink=";
            },
        },
        props: [ 'dialog', 'show' ]
    }
</script>
