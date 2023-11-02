<template>
    <div class="users-chat">
        <div class="users--list">
            <user-list :userList="this.users" />
        </div>
        <chat class="chat" :userList="users" :selectedUser="selectedUser" />
    </div>
</template>
<script>
    import { mapState, mapMutations } from 'vuex';
    import UserList from "@/components/UserList.vue";
    import User from "@/components/User.js"
    import Chat from "@/components/Chat.vue";

    export default {
        props: {
            selectedUser: {
                type: String,
                required: true,
            }
        },
        data() {
            return {
                users: []
            }
        },
        mounted() {
            this.getUsers();
        },
        components: { UserList, Chat },
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
            }

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