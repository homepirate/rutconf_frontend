<template>
    <div class="chat-container">
        <div class="messages">
            <div v-for="(chat, idx) in state.chats"
					:key="idx" class="message">
                <span class="username">{{ chat.userId }}</span>
                <span class="content">{{ chat.content }}</span>
            </div>
        </div>
        <div class="input-container">
            <my-input v-model="state.message"
						@keydown.enter="sendMessage" type="text" placeholder="Введите сообщение" class="input" />
            <button @click="sendMessage()" class="send-btn btn">
                <Send></Send>
            </button>
            <button class="btn-text-to-voice btn">
                <IconTTV></IconTTV>
            </button>
            <button class="btn-text-translator btn" @click="sendTranslateMessage()">
                <IconTrans></IconTrans>
            </button>
        </div>
    </div>
</template>

<script>
import Send from './icons/Send.vue';
import IconTrans from './icons/IconTrans.vue'
import IconTTV from './icons/IconTTV.vue'
import { reactive } from 'vue';

export default {
    components: {
        Send,
        IconTrans, 
        IconTTV,
    },
    props: {
        // userList: {
        //     type: Array,
        //     required: true
        // },
        // selectedUser: {
        //     type: String,
        //     required: true,
        // },
        subscribers: Object,

    },
    setup(props, { emit }) {
		const state = reactive({
			// right: true,
			isSidebarOpen: true,
			selectedUser: 'all',
			message: '',
			subscribers: props.subscribers,
			chats: [],
		});

		const toggle = () => {
			state.isSidebarOpen = !state.isSidebarOpen;
		};

		const sendMessage = ( ) => {
			let strippeddMessage = state.message.trim();

			if (strippeddMessage === '') return;

			console.log('보낼 메시지 : ' + strippeddMessage);
            console.log('Emitting message event');
			emit('message', {
				content: strippeddMessage,
                to: state.selectedUser,
			});

			event.preventDefault(); // enter키 누를 때 줄바꿈 방지
			state.message = ''; // 메시지 창 초기화

			console.log(state.subscribers);
		};


         const sendTranslateMessage = async ( ) => {
            let strippeddMessage = state.message.trim();

			if (strippeddMessage === '') return;
            const url = `https://api.mymemory.translated.net/get?q=${strippeddMessage}&langpair=ru|en`;
        const response = await fetch(url);
      const data = await response.json();
      console.log(data)
        let translatedText = data.responseData.translatedText;
        console.log(translatedText)
        emit('message', {
				content: translatedText,
                to: state.selectedUser,
			});

			event.preventDefault(); // enter키 누를 때 줄바꿈 방지
			state.message = ''; // 메시지 창 초기화
    };

        

		const addMessage = async (messageData, isMyMessage, isPrivate) => {
			let message = JSON.parse(messageData);

			// 내가 보낸 메시지인 경우
			if (isMyMessage) {
				message.sender += ' (You)';
			}

			// 개인 메시지인 경우
			if (isPrivate) {
				message.content += ' (private)';
			}

			// let chatBar = document.querySelector('#chat-bar');
			// let isScrollBottom =
			// 	chatBar.scrollHeight - chatBar.scrollTop <= chatBar.clientHeight + 2;

			// await 키워드 => 새로운 채팅 메시지 추가 완료 후 스크롤바가 아래로 이동되도록 함.
			await state.chats.unshift({
				userId: message.sender,
				time: message.time,
				content: message.content,
				isMyMessage: isMyMessage,
			});

			// // 채팅 스크롤이 끝까지 내려가 있는 경우 => 스크롤바 맨 아래로 이동시키기
			// if (isScrollBottom) {
			// 	chatBar.scrollTo({ top: chatBar.scrollHeight, behavior: 'smooth' });
			// }

			console.log("chaaaaaaaaaaaat", state.chats);
		};

		return { state, toggle, sendMessage, addMessage, sendTranslateMessage};
	},
    data() {
        return {
            messageInput: '', // Входное поле сообщения
            messages: [], // Массив сообщений
            // selectedUser: "betrayedMuesli6",
        };
    },
    methods: {
    //     sendMessage() {
    //         if (!this.selectedUser) return; // Если пользователь не выбран, ничего не делаем

    //         // const selectedUser = this.userList.find(user => user.name === this.selectedUser);


    //         if (this.messageInput.trim() == '') return;


    //         const message = {
    //             username: this.selectedUser, // Имя выбранного пользователя
    //             content: this.messageInput // Введенное сообщение
    //         };

    //         this.messages.unshift(message);
    //         this.messageInput = '';

    //     }
    },

};
</script>

<style scoped>
.chat-container {
    background: rgba(93, 11, 161, 1);
    display: flex;
    /* Использование свойства flex */
    flex-direction: column;
    /* Отображение элементов в столбец */
    width: 385px;
    height: 437px;
    border-radius: 15px;
    margin: 8px;
}

.messages {
    display: flex;
    flex-direction: column-reverse;
    margin-bottom: 10px;
    flex: 1;
    /* Заполнение доступного пространства */
    overflow-y: scroll;
    overflow-x: hidden;
}

.message {
    width: 96%;
    padding: 5px;
    word-break: break-word;
    margin-bottom: 5px;
    font-size: 20px;
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
    justify-content: start;
}

.input {
    margin: 7px;
    margin-right: 0px;
    height: 30px;
    padding: 5px;
    border-radius: 8px;
    flex: 1;
}

.btn {
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

.btn:hover {
    transform: scale(1.1);
}


.messages::-webkit-scrollbar {
    width: 1px;
    /* Устанавливаем ширину ползунка */
}

.messages::-webkit-scrollbar-thumb {
    background-color: transparent;
    /* Устанавливаем прозрачный цвет ползунка */
}

.messages::-webkit-scrollbar-track {
    background-color: transparent;
    /* Устанавливаем прозрачный цвет трека */
}
</style>