<template>
    <div class="chat-container">
      <div class="messages">
        <!-- Отображение сообщений -->
        <div v-for="message in messages" :key="message.id" class="message">
          <span class="username">{{ message.username }}</span>
          <span class="content">{{ message.content }}</span>
        </div>
      </div>
      <div class="input-container">
        <my-input v-model="messageInput" type="text" placeholder="Введите сообщение" class="input" />
        <button @click="sendMessage" class="send-btn"><Send></Send></button>
      </div>
    </div>
  </template>
  
  <script>
   import Send from './icons/Send.vue';
  export default {
    components: {
        Send
        },
    props: {
      userList: {
        type: Array,
        required: true
      },
      selectedUser: {
        type: String,
        required: true,
      }
    },
    data() {
      return {
        messageInput: '', // Входное поле сообщения
        messages: [], // Массив сообщений
        // selectedUser: "betrayedMuesli6",
      };
    },
    methods: {
        sendMessage() {
            if (!this.selectedUser) return; // Если пользователь не выбран, ничего не делаем

            // const selectedUser = this.userList.find(user => user.name === this.selectedUser);

            const message = {
                username: this.selectedUser, // Имя выбранного пользователя
                content: this.messageInput // Введенное сообщение
            };

            this.messages.unshift(message);
            this.messageInput = '';
        }
  },

  };
  </script>
  
  <style scoped>
.chat-container {
  background: rgba(93, 11, 161, 1);
  display: flex; /* Использование свойства flex */
  flex-direction: column; /* Отображение элементов в столбец */
  width: 327px;
  height: 437px;
  border-radius: 15px;
  margin: 8px;
}

.messages {
    display: flex;
    flex-direction: column-reverse;
  margin-bottom: 10px;
  flex: 1; /* Заполнение доступного пространства */
  overflow-y: scroll; 
  overflow-x: hidden;
}

.message {
    width: 96%;
  padding: 5px;
  word-break: break-word;
  margin-bottom: 5px;
  font-size: 20px ;
  flex-direction: column;
  color: white;
}

.message .username {

  font-weight: bold;
  color: rgba(193, 67, 252, 1);
  margin-right: 10px;
}

.input-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.input {
  margin: 5px;
  margin-right: 0px;
  margin-bottom: 7px;
  height: 30px;
  padding: 5px;
  border-radius: 5px;
  flex: 1;
}

.send-btn {
  margin-right: 15px;
  width: 30px;
  height: 30px;
  background-size: cover;
  border: none;
  background-repeat: no-repeat;
  background-color: transparent;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.send-btn:hover {
  transform: scale(1.1);
}
.messages::-webkit-scrollbar {
  width: 1px; /* Устанавливаем ширину ползунка */
}

.messages::-webkit-scrollbar-thumb {
  background-color: transparent; /* Устанавливаем прозрачный цвет ползунка */
}

.messages::-webkit-scrollbar-track {
  background-color: transparent; /* Устанавливаем прозрачный цвет трека */
}
  </style>