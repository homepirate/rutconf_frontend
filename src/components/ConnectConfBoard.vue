<template>
    <div class="main-rectangle">
        <div class="back-and-input-name">
            <button class="btn-back" @click="$router.push('/')"></button>
            <my-input v-model="displayName" style="width: 351px; height: 45px; margin: 5px;" placeholder="Введите отображаемое имя"/>
        </div>
        <div class="my-fat-button">
            <my-fat-button style="margin-top: 5px; width: 403px; height: 49px;" @click="Connect">
                    <span style="margin-top: 5px; font-size: 20px;">Подключиться</span>
            </my-fat-button>
        </div>
    </div>

</template>

<script>
import { mapMutations } from 'vuex';
import User from "@/components/User.js"
export default {
    data() {
    return {
      displayName: '',
    }
},

    name: 'connect-conf-board',
    components: {},
    async mounted() {
    },
    methods: {
      ////////////////////////////// TEST //////////////////////////
    //   ...mapMutations(['addToGlobalArray', 'removeFromGlobalArray']),
    // addItem() {
    //   this.addToGlobalArray(new User(this.displayName)); // Добавление элемента в глобальный массив
    // },
    // removeItem(index) {
    //   this.removeFromGlobalArray(index); // Удаление элемента из глобального массива
    // },
// ////////////////////////////////////////////////////
      ...mapMutations(['setDisplayName']),
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
            role: "user",
          }),
        });

        const data = await response.json();
      } catch (error) {
        console.error(error);
        return null;
      }
    },

        async Connect() {
          if (this.displayName.trim() === ""){
            return
          }
      await this.sendDataToBackend(); 
      this.setDisplayName(this.displayName); 
      //////// TEST////////
      // this.addItem(); 
        /////////////
    },
    },
};
</script>

<style scoped>
   .main-rectangle {
        width: 423px;
        height: 120px;
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