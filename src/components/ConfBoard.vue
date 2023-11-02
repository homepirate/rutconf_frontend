<template>
    <div class="users-chat">
        <div class="users--list">
            <user-list :userList="this.users" />
        </div>
        <chat class="chat" :userList="users" :selectedUser="selectedUser" />
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
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import UserList from "@/components/UserList.vue";
import User from "@/components/User.js"
import Chat from "@/components/Chat.vue";
import IconMicroON from './icons/IconMicroON.vue';
import IconMicroOFF from './icons/IconMicroOFF.vue';
import IconCamOFF from './icons/IconCamOFF.vue';
import IconCamON from './icons/IconCamON.vue';

export default{
    props: {
        selectedUser: {
        type: String,
        required: true,
      }
    },
    data(){
        return {
            users: [],
            isMicroActive: false,
            isCamActive: false
        }
    },
    mounted() {
        this.getUsers();
  },
    components: {
      UserList, 
      Chat,
      IconMicroON,
      IconMicroOFF,
      IconCamON,
      IconCamOFF,
    },
    computed: {
    // ...mapState(['globalArray'])
  },

        methods: {
            async getUsers() {
                try {
                    const currentLink = window.location.href.split("/").at(-1);
                    const response = await fetch("http://localhost:8000/get-users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ url: currentLink }) // Отправляем параметр currentLink в формате JSON
                    });
                    const userDataList = await response.json();

                    const userList = userDataList.map(userData => {
                        // Создаем экземпляр класса User для каждого элемента возвращенного списка
                        return new User(userData.name, userData.role, userData.videoStream, userData.voiceStream);
                    });

        this.users = userList;
      } catch (error) {
        console.error('Ошибка при получении списка пользователей:', error);
      }
    },
    toggleMicrophone() {
                this.isMicroActive = !this.isMicroActive;
                // if (this.isMicroActive) {
                //     this.$nextTick(() => {
                //         if (this.$refs.microWin) {
                //             this.$refs.microWin.initializeMicrophone();
                //         }
                //     });
                // } else {
                //     this.$nextTick(() => {
                //         if (this.$refs.microWin) {
                //             this.$refs.microWin.stopMicrophone();
                //         }
                //     });
                // }
            },
            toggleCamera() {
                this.isCamActive = !this.isCamActive;
                // if (this.isCamActive) {
                //     this.$nextTick(() => {
                //         if (this.$refs.videoWin) {
                //             this.$refs.videoWin.startCamera();
                //         }
                //     });
                // } else {
                //     this.$nextTick(() => {
                //         if (this.$refs.videoWin) {
                //             this.$refs.videoWin.stopCamera();
                //         }
                //     });
                // }
            },

            // Это здесь только для теста
            //     ...mapMutations(['addToGlobalArray', 'removeFromGlobalArray']),
            //     addItem() {
            //       this.addToGlobalArray('Новый элемент'); // Добавление элемента в глобальный массив
            //     },
            //     removeItem(index) {
            //       this.removeFromGlobalArray(index); // Удаление элемента из глобального массива
            //     }
        }
    }
</script>
<style scoped>
    .users-chat {
        display: inline;
        float: left;
        width: 342px;
        height: 897px;
        border-radius: 15px;
        background: rgba(217, 217, 217, 1);
    }

    .users--list {
        overflow-y: scroll;
        background: rgba(93, 11, 161, 1);
        display: inline;
        float: left;
        width: 327px;
        height: 437px;
        border-radius: 15px;
        margin: 8px;
    }
    .btn-micro-cam {
      left: 40%;
      display: flex;
      justify-content: space-evenly;
      align-items: flex-end;
      position: fixed;
      bottom: 20px;
      width: 400px;
}

        .users--list::-webkit-scrollbar {
            width: 1px; /* Устанавливаем ширину ползунка */
        }

        .users--list::-webkit-scrollbar-thumb {
            background-color: transparent; /* Устанавливаем прозрачный цвет ползунка */
        }

        .users--list::-webkit-scrollbar-track {
            background-color: transparent; /* Устанавливаем прозрачный цвет трека */
        }
</style>