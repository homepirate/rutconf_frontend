<template>
    <div>
      <div class="logo-div">
        <icon-logo/>
        <h1>RUT CONF</h1>
      </div>
      <div class="main-board-wrapper">
        <main-board/>
      </div>
    </div>
</template>
  
<script>
  import MainBoard from "@/components/MainBoard.vue"
  import IconLogo from "@/components/icons/IconLogo.vue";
  export default {
    components : {
      MainBoard,
      IconLogo,
    }
  
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
 }

.main-board-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
  
</style>