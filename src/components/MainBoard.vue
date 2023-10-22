<template>
    <div class="main-rectangle">
        <div class="btn-micro-cam">
            <my-button-mc style="margin-left: 5px" @click="toggleMicrophone">
                <span style="display: flex; align-items: center;">
                    <IconMicroOFF v-if="!isMicroActive"></IconMicroOFF>
                    <IconMicroON v-if="isMicroActive"></IconMicroON>
                    <span style="margin-left: 5px;">
                        {{ isMicroActive ? "Выключить микрофон" : "Включить микрофон" }}
                    </span>
                </span>
            </my-button-mc>
            <my-button-mc style="margin-left: 5px" @click="toggleCamera">
                <span style="display: flex; align-items: center;">
                    <IconCamOFF v-if="!isCamActive"></IconCamOFF>
                    <IconCamON v-if="isCamActive"></IconCamON>
                    <span style="margin-left: 5px;">
                        {{ isCamActive ? "Выключить камеру" : "Включить камеру" }}
                    </span>
                </span>
            </my-button-mc>
        </div>
        <div class="my-fat-button">
            <my-fat-button
                style="margin-top: 5px; margin-left: 5px; width: 390px; height: 190px ; display: flex; align-items: center;"
                @click="redirectToBlankPage">
                <IconCreateConf> </IconCreateConf>
                Создать конференцию
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
        },
        toggleCamera() {
            this.isCamActive = !this.isCamActive;
        },
        redirectToBlankPage() {
            window.open('about:blank', '_blank');
        }
    }
};
</script>

<style scoped>
.main-rectangle {
    width: 401px;
    height: 606px;
    border-radius: 25px;
    background: rgba(158, 0, 255, 0.3);
}

.btn-micro-cam {
    margin-top: 329px;
}
</style>