<template>
    <div class="main-rectangle centered-div">
        <div class="back-and-input-name">
            <button class="btn-back" @click="$router.push('/')"></button>
            <my-input v-model="displayName" style="height: 100%;margin-left: 5px" placeholder="Введите отображаемое имя" />
        </div>
        <div class="input-url-for-conf-container">
            <!-- <div v-if="isCopySuccess" class="copy-success"> Ссылка скопирована!</div> Всплывающая надпись -->

            <my-input class="input-url-for-conf" id="urlInput" v-model="urlValue" readonly />
            <!-- <button class="copy-btn" @click="copyToClipboard"></button> -->
            <IconCopyLink class="icon-copy-link" @click="copyLink" />
        </div>
        <div class="my-fat-button">
            <my-fat-button style="height: 100%;" @click="createAndConnect">
                <span style="font-size: 20px;">Создать и подключиться</span>
            </my-fat-button>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';



import User from "@/components/User.js"
import IconCopyLink from './icons/IconCopyLink.vue';
export default {
    props: {
        displayName: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            displayName: '',
            urlValue: '',
            isConferenceCreator: true,
            isCopySuccess: false,
        }
    },

    name: 'createconf-board',
    components: {
        IconCopyLink,
    },
    async mounted() {
        this.urlValue = await this.fetchDataFromBackend();;
    },
    methods: {
        copyLink() {
            const inputElement = document.getElementById('urlInput');
            if (inputElement) {
                // inputElement.focus();
                inputElement.select();

                window.navigator.clipboard.writeText(inputElement.value)
                this.isCopySuccess = true; // Устанавливаем флаг успешного копирования
                setTimeout(() => {
                    this.isCopySuccess = false; // Сбрасываем флаг после определенного времени (например, через 2 секунды)
                }, 1000);

                window.getSelection().removeAllRanges();
            }
        },



        ////////////////////////////// TEST //////////////////////////
        //    ...mapMutations(['addToGlobalArray', 'removeFromGlobalArray']),
        // addItem() {
        //   this.addToGlobalArray(new User(this.displayName)); // Добавление элемента в глобальный массив
        // },
        // removeItem(index) {
        //   this.removeFromGlobalArray(index); // Удаление элемента из глобального массива
        // },
        // ////////////////////////////////////////////////////
        ...mapMutations(['setDisplayName']),
        async fetchDataFromBackend() {
            try {
                const response = await fetch('https://api.example.com/data');
                const data = await response.json();
                return data.value;
            } catch (error) {
                console.error(error);
                return "None";
            }
        },

        async sendDataToBackend() {
            try {
                console.log(this.displayName)
                const dspName = this.displayName;

                // Отправить displayName на бекенд
                const response = await fetch('https://api.example.com/data', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        displayName: dspName,
                        role: "creator",
                    }),
                });

                const data = await response.json();
            } catch (error) {
                console.error(error);
                return null;
            }
        },

        async createAndConnect() {
            if (this.displayName.trim() === "") {
                return
            }
            const urlValue = document.querySelector('.input-url-for-conf').value;
            console.log(urlValue)
            await this.sendDataToBackend();

            if (urlValue) {
                // this.conferenceUrl = urlValue;
                // Перейти на страницу с конференцией
                this.$router.push(`/call/${urlValue}`);
                this.setDisplayName(this.displayName);
                //////// TEST////////
                // this.addItem(); 
                /////////////
            }
        },
    },
};
</script>

<style scoped>
.centered-div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.main-rectangle {
    width: 400.99px;
    border-radius: 25px;
    background: rgba(158, 0, 255, 0.3);
    display: flex;
    flex-direction: column;
    /* height: 170px; */
}

.back-and-input-name {
    display: flex;
    width: 380.99px;
    justify-content: center;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    height: 50px;
    margin-bottom: 5px;
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
}

.back-and-input-name>* {
    width: 100%;
}

.btn-back {
    background-image: url("@/components/icons/55ovjpq6bo1dpbpq69e2m1lvrq.png");
    width: 45px;
    height: 45px;
    background-size: cover;
    border: none;
    background-repeat: no-repeat;
    background-color: transparent;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
    margin-right: 5px;
}

.btn-back:hover {
    transform: scale(1.1);
}

.my-fat-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 380.99px;
    height: 50px;
    margin-top: 5px;
    margin-bottom: 10px;
    margin-left: 10px;
    margin-right: 10px;
}

.my-fat-button>* {
    width: 100%;
}

.input-url-for-conf-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 380.99px;
    height: 50px;
    margin-top: 5px;
    margin-bottom: 5px;
    margin-left: 10px;
    margin-right: 10px;
}

.input-url-for-conf-container>* {
    width: 100%;
}

.input-url-for-conf {
    height: 100%;
}

.icon-copy-link {
    position: absolute;
    height: 40px;
    margin-left: 320px;
}

.icon-copy-link:hover {
    transform: scale(1.025);
}</style>