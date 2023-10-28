<template>
    <div class="main-rectangle">
        <div class="webcam-window">
            <div class="cam-video-off" v-if="!isCamActive">
                <IconCamOFF style="width: 75%; height: 75%;"></IconCamOFF>
            </div>
            <VideoWin v-else ref="videoWin" :isCamActive="isCamActive" />
        </div>
        <div class="micro-window">
            <MicroWin ref="microWin" v-show="isMicroActive" :isMicroActive="isMicroActive" />
        </div>
        <div class="btn-micro-cam">
            <my-button-mc style="width:189px" @click="toggleMicrophone">
                <span style="display: flex; align-items: center;">
                    <IconMicroOFF v-if="!isMicroActive"></IconMicroOFF>
                    <IconMicroON v-else></IconMicroON>
                    <span style="display: flex; align-items: center">
                        {{ isMicroActive ? "Выключить микрофон" : "Включить микрофон" }}
                    </span>
                </span>
            </my-button-mc>
            <my-button-mc style="width:189px" @click="toggleCamera">
                <span style="display: flex; align-items: center;">
                    <IconCamOFF v-if="!isCamActive"></IconCamOFF>
                    <IconCamON v-else></IconCamON>
                    <span style="display: flex; align-items: center">
                        {{ isCamActive ? "Выключить камеру" : "Включить камеру" }}
                    </span>
                </span>
            </my-button-mc>
        </div>
        <div class="my-fat-button" style="display: flex; justify-content: center; align-items: center;">
            <my-fat-button style="margin-top: 5px; margin-bottom: 10px; margin-left: 10px; margin-right: 10px; width: 383px; height: 173px;">
                <span style=" display: flex; align-items: center;
             display: flex; flex-direction: column; align-items: center;" @click="$router.push('/create-call')">
                    <IconCreateConf></IconCreateConf>
                    <span style="margin-top: 5px; font-size: 20px;">Создать конференцию</span>
                </span>
            </my-fat-button>
        </div>
    </div>
</template>

<script>
    import MyButtonMC from './UI/MyButtonMC.vue';
    import MyFatButton from './UI/MyFatButton.vue';
    import IconMicroON from './icons/IconMicroON.vue';
    import IconMicroOFF from './icons/IconMicroOFF.vue';
    import IconCamOFF from './icons/IconCamOFF.vue';
    import IconCamON from './icons/IconCamON.vue';
    import VideoWin from './UI/VideoWin.vue';
    import MicroWin from './UI/MicroWin.vue'
    import IconCreateConf from './icons/IconCreateConf.vue';

    export default {
        name: 'main-board',
        components: {
            MyButtonMC,
            MyFatButton,
            IconMicroON,
            IconMicroOFF,
            IconCamON,
            IconCamOFF,
            VideoWin,
            MicroWin,
            IconCreateConf,
        },
        data() {
            return {
                isMicroActive: false,
                isCamActive: false
            };
        },
        methods: {
            toggleMicrophone() {
                this.isMicroActive = !this.isMicroActive;
                if (this.isMicroActive) {
                    this.$nextTick(() => {
                        if (this.$refs.microWin) {
                            this.$refs.microWin.initializeMicrophone();
                        }
                    });
                } else {
                    this.$nextTick(() => {
                        if (this.$refs.microWin) {
                            this.$refs.microWin.stopMicrophone();
                        }
                    });
                }
            },
            toggleCamera() {
                this.isCamActive = !this.isCamActive;
                if (this.isCamActive) {
                    this.$nextTick(() => {
                        if (this.$refs.videoWin) {
                            this.$refs.videoWin.startCamera();
                        }
                    });
                } else {
                    this.$nextTick(() => {
                        if (this.$refs.videoWin) {
                            this.$refs.videoWin.stopCamera();
                        }
                    });
                }
            },
        }
    };
</script>

<style scoped>

    .main-rectangle {
        width: 401px;
        height: 606px;
        border-radius: 25px;
        background: rgba(158, 0, 255, 0.3);
        display: flex;
        flex-direction: column;
        align-items: center;
    }


    .webcam-window {
        width: 385px;
        height: 225px;
        margin-top: 10px;
        margin-right: 10px;
        margin-left: 10px;
        margin-bottom: 5px;
        background: rgba(0, 0, 0, 0.7);
        border-radius: 25px;
        overflow: hidden; /* Это чтоб блок внутри занимал полностью родительский div  */
    }

    .micro-window {
        background: rgba(0, 0, 0, 0.7);
        width: 385px;
        height: 80px;
        border-radius: 25px;
        margin-top: 5px;
        margin-right: 10px;
        margin-left: 10px;
        margin-bottom: 5px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .cam-video-off {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .btn-micro-cam {
        display: flex;
        flex-direction: row;
        margin-top: 5px;
        margin-bottom: 5px;
        width: 385px;
        justify-content: space-between;
    }

</style>