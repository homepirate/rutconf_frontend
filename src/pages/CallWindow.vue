<template>
    <div>
      <div v-if="!displayName" class="logo-div">
        <icon-logo />
        <h1>RUT CONF</h1>
      </div>
  
      <div v-if="displayName" class="conf-board-wrapper">
        <conf-board></conf-board>
      </div>
  
      <div v-else class="connect-conf-board-wrapper">
        <connect-conf-board></connect-conf-board>
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
  methods: {
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
  h1{
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