<template>
    <div class="main-rectangle">
        <div class="back-and-input-name">
            <button class="btn-back" @click="$router.push('/')"></button>
            <my-input v-model="displayName" style="width: 358px; height: 45px; margin-right: 10px; margin-left: 3px;"
                placeholder="Введите отображаемое имя" />
        </div>
        <div class="input-url-for-conf-container">
            <!-- <div v-if="isCopySuccess" class="copy-success"> Ссылка скопирована!</div> Всплывающая надпись -->

            <my-input class="input-url-for-conf"  id="urlInput" v-model="urlValue"
                style="width: 400px; height: 49px; margin: 5px; margin-left: 11px" readonly/>
                <!-- <button class="copy-btn" @click="copyToClipboard"></button> -->
            <IconCopyLink class="icon-copy-link" @click="copyLink" />
        </div>
        <div class="my-fat-button">
            <my-fat-button style="margin-top: 5px; width: 403px; height: 49px;" @click="createAndConnect">
                <span style="margin-top: 5px; font-size: 20px;">Создать и подключиться</span>
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
            const inputElement =  document.getElementById('urlInput');
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
                return "NONE";
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
.main-rectangle {
    width: 423px;
    height: 186px;
    border-radius: 25px;
    background: rgba(158, 0, 255, 0.3);
}

.back-and-input-name {
    display: flex;
    align-items: center;
}

.btn-back {
    background-image: url("@/components/icons/55ovjpq6bo1dpbpq69e2m1lvrq.png");
    margin-left: 5px;
    margin-top: 5px;
    width: 50px;
    height: 50px;
    background-size: cover;
    border: none;
    background-repeat: no-repeat;
    background-color: transparent;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
}

.btn-back:hover {
    transform: scale(1.1);
}

.my-fat-button {
    display: flex;
    justify-content: center;
    align-items: center;
}

.input-url-for-conf-container {
    position: relative;
}

.icon-copy-link {
    position: absolute;
    width: 30px;
    right: 12px;
    top: 3px;
    cursor: pointer;
    }
.icon-copy-link:hover {
        transform: scale(1.025);
}

</style>