<template>
    <div>
      <div v-if="!displayName" class="logo-div">
        <icon-logo />
        <h1>RUT CONF</h1>
      </div>
  
      <div v-if="displayName" class="conf-board-wrapper">
        <conf-board :selectedUser="displayName"></conf-board>
      </div>
  
      <div v-else class="connect-conf-board-wrapper">
        <connect-conf-board :selectedUser="displayName"></connect-conf-board>
      </div>
    </div>
  </template>


<script>
    import { mapState } from 'vuex';
  import ConnectConfBoard from "@/components/ConnectConfBoard.vue";
  import ConfBoard from "@/components/ConfBoard.vue"
  import IconLogo from "@/components/icons/IconLogo.vue";
  export default {
    components : {
        ConnectConfBoard,
      IconLogo,
      ConfBoard,
    },
    data() {
    return {
    };
  },
  mounted() {
    this.sendRequest();
  },
  methods: {
    sendRequest() {
      const currentLink = window.location.href.split("/").at(-1); // Получение текущей ссылки
      console.log("1111111111111111", currentLink)
      fetch('http://localhost:8000/check-link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({url: currentLink }), // Преобразование данных в формат JSON и передача их в теле запроса
    })
      .then((response) => response.json()) // Преобразование ответа сервера в JSON
      .then((data) => {
        console.log(data); // Обработка полученных данных
        if (data['status'] === false){
          this.$router.push("/")
        }
      })
      .catch((error) => {
        console.error(error); // Обработка ошибок, если они возникнут при запросе
      });
    },
  },
  computed: {
    ...mapState(['displayName']), // Получаем значение displayName из состояния Vuex
  },
  }
</script>


<style scoped>
    .logo-div {
        display: flex;
        align-items: flex-start;
    }

    h1 {
        size: 25px;
        font-family: 'Inter';
        font-style: italic;
    }

    .connect-conf-board-wrapper {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 40%;
        left: 38%;
    }
</style>