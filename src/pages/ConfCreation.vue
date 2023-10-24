<template>
    <div>
      <div class="logo-div">
        <icon-logo/>
        <h1>RUT CONF</h1>
      </div>
      <div class="create-conf-board-wrapper">
        <create-conf-board></create-conf-board>
      </div>
    </div>
</template>
  
<script>
  import CreateConfBoard from "@/components/CreateConfBoard.vue"
  import IconLogo from "@/components/icons/IconLogo.vue";
  export default {
    components : {
      CreateConfBoard,
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
    font-style: italic;
 }

.create-conf-board-wrapper {
  position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 40%;
    left: 38%;
}
  
</style>