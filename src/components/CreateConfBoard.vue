<template>
    <div class="main-rectangle">
        <div class="back-and-input-name">
            <button class="btn-back" @click="$router.push('/')"></button>
            <my-input v-model="displayName" style="width: 358px; height: 45px; margin: 5px;" placeholder="Введите отображаемое имя"/>
        </div>
        <my-input class="input-url-for-conf" v-model="urlValue" style="width: 403px; height: 49px; margin: 5px;" readonly/>
        <div class="my-fat-button">
            <my-fat-button style="margin-top: 5px; width: 410px; height: 49px;" @click="createAndConnect">
                    <span style="margin-top: 5px; font-size: 20px;">Создать и подключиться</span>
            </my-fat-button>
        </div>
    </div>

</template>

<script>
export default {
    data() {
    return {
      displayName: '',
      urlValue: '',
    }
},

    name: 'createconf-board',
    components: {},
    async mounted() {
        this.urlValue = await this.fetchDataFromBackend();;
    },
    methods: {
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
      const urlValue = document.querySelector('.input-url-for-conf').value;
      console.log(urlValue)
      await this.sendDataToBackend();

      if (urlValue) {
        this.conferenceUrl = urlValue;
        // Перейти на страницу с конференцией
        this.$router.push(`/call/${urlValue}`);
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

    .btn-back{
        background-image: url("@/components/icons/55ovjpq6bo1dpbpq69e2m1lvrq.png");
        margin-left: 5px;
        margin-top: 5px;
        width: 50px;
        height: 50px;
        background-size: cover;
        border:none;
        background-repeat: no-repeat;
        background-color: transparent;
        cursor: pointer;
        transition: transform 0.2s ease-in-out; 
    }
    .btn-back:hover{
    transform: scale(1.1);
    }

    .my-fat-button{
        display: flex; 
        justify-content: center; 
        align-items: center;
    }
</style>