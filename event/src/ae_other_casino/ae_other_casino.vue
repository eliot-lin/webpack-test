<template>
    <div>
        <div class="container">
            <!-- 主視覺 start-->
            <div class="main">
                <div class="main-task">
                    <div class="award-img">
                        <li v-if="maintask.awardType == 0">
                            <img src="/allchess/event/src/ae_other_casino/images/award-09.png">
                                <div class="item-tip">
                                    <img src="/allchess/event/src/ae_other_casino/images/award-09.png">
                                    <div class="item-name" v-html="maintask.award_name"></div>
                                    司馬懿就是這樣退兵的
                                </div>
                        </li>
                        <!-- 領取後，獎勵改為金幣-->
                        <li v-else>
                            <img src="/allchess/event/src/ae_other_casino/images/award-10.png">
                                <div class="item-tip">
                                    <img src="/allchess/event/src/ae_other_casino/images/award-10.png">
                                    <div class="item-name">金幣</div>
                                    遊戲中的通用貨幣
                            </div>
                        </li>
                    </div>
                    <!--領取後，獎勵改為 金 幣 x 1000-->
                    <div class="main-item-name" v-html="maintask.award_name"></div>

                    <!--進度-->
                    <div class="progress">
                        <p><span class="my-num" v-html="maintask.object"></span></p>
                        <p v-html="maintask.name"></p>
                    </div>

                    <a :class="drawAwardClass(maintask.status)" @click="drawAward(11 ,maintask.status)"></a>
                </div>
            </div>
            <!-- 主視覺 end-->

            <!-- 右 start-->
            <div class="article">
                <!-- 資訊區 start-->
                <div class="info">
                    時間：2020.09.22-10.19 12:00<br>
                    ※每週一中午12:00刷新任務<br>
                    說明：6等以上至娛樂城完成任務即可領獎
                </div>
                <!-- 任務區 start-->
                <div class="task-area">
                    <div class="task" v-for="(item, index) in data.taskInfo">
                        <div class="task-name" v-html="item.name"></div>
                        <!--進度-->
                        <div class="progress">
                            <p><span v-if="item.status != 0" class="my-num" v-html="item.object"></span></p>
                        </div>
                        <!--獎勵圖-->
                        <div class="award-img">
                            <li v-for="(info, i) in item.awardInfo">
                                <img :src="getPicUrl(i)">
                                <div class="item-tip">
                                    <img :src="getPicUrl(i)">
                                    <div class="item-name" v-html="info[0]"></div>
                                    <p v-html="info[1]"></p>
                                </div>
                            </li>
                        </div>
                        <a :class="drawAwardClass(item.status)" @click="drawAward(item.task, item.status)"></a>
                    </div>
                </div>
            </div>
            <!-- 右 end-->
        </div>

        <dialogComponent :show="show" :dialog="dialog"/>
        <eventPastComponent :showPastTime="showPastTime" :dialog="dialog"/>
    </div>
</template>

<script>
    import Vue from 'vue';
    import axios from 'axios';
    import qs from 'qs-stringify';
    import './css/index.scss';
    import dialogComponent from 'components/dialog.vue';
    import eventPastComponent from 'components/eventPast.vue';

    export default {
        data: function() {
            return {
                info : {},
                data : {},
                maintask: {},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                show: false,
                showPastTime: false,
                dialog: {},
            }
        },
        components: {
            dialogComponent,
            eventPastComponent
        },
        methods: {
            getBaseInfo: function getBaseInfo() {
                var $this = this;
                const queryString = qs({'event' : 'ae_other_casino'});

                var data = {
                    'event' : 'ae_other_casino'
                };
                axios.post('/allchess/?/event/baseinfo/', queryString, { 'headers' : $this.headers} )
                .then(function(response) {
                    $this.info = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                })
            },
            getShowInfo: function getShowInfo() {
                var $this = this;
                const queryString = qs({'event' : 'ae_other_casino'});

                axios.post('/allchess/?/event/showinfo/', queryString, { 'headers' : $this.headers} )
                .then(function(response) {
                    if (response.data.success == 1) {
                        $this.maintask = response.data.taskInfo.pop();
                        $this.data = response.data;
                    } else {
                        $this.showPastTime = true;
                        $this.dialog = response.data;
                    }
                })
                .catch(function(error) {
                    console.log(error);
                })
            },
            drawAward: function drawAward(task, status) {
                if (status == 0) { // 已領獎
                    return;
                }
                var $this = this;

                const queryString = qs({
                    'event' : 'ae_other_casino',
                    'task' : task,
                });

                axios.post('/allchess/?/event/drawAward/', queryString, { 'headers' : $this.headers} )
                .then(function(response) {
                    if (response.data.type == 1) { // 非活動時間
                        $this.dialog = response.data;
                        $this.showPastTime = true;
                    } else {
                        $this.dialog = response.data;
                        $this.show = true;
                    }
                })
                .catch(function(error) {
                    console.log(error);
                })
            },
            drawAwardClass: function drawAwardClass(status) { // 0: 已領獎, 1: 未完成, 2: 可領獎 (為了排序方便)
                return status == 1 ? 'button-dialog btn-off' : 
                    status == 2 ? 'button-dialog btn-on' : 
                    'button-dialog btn-finish';
            },
            getPicUrl: function getPicUrl(index) {
                return '/allchess/event/src/ae_other_casino/images/award-0' + index + '.png'
            }
        },
        created() {
            this.getBaseInfo();
            this.getShowInfo();
        }
    }
</script>

