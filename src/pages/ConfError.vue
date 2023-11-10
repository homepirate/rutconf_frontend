<template>
    <div>
        <div class="logo-div">
            <icon-logo />
            <h1>RUT CONF</h1>
        </div>
        <div class="error-page">
            <h2>ОШИБКА</h2>
            <p>Такой конференции не существует</p>
            <MyFatButton @click="$router.push('/')">На главную</MyFatButton>
        </div>
    </div>
</template>
  
<script>
import MainBoard from "@/components/MainBoard.vue"
import IconLogo from "@/components/icons/IconLogo.vue";
import MyFatButton from '@/components/UI/MyFatButton.vue';

export default {
    components: {
        MainBoard,
        IconLogo,
        MyFatButton,
    }

}
</script>
  
<style scoped>
.logo-div {
    display: flex;
    align-items: flex-start;
}

.error-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}

h1 {
    size: 25px;
    font-family: 'Inter';
    font-style: italic;
}

p {
    font-size: 18px;
}
</style>