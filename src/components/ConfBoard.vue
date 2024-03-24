<template>
    <div class="users-chat">
        <div class="users--list">
            <user-list :userList="this.subscribers" />
        </div>
        <chat class="chat" ref="chat"
				@message="sendMessage"
        @speech="speechText"
				:subscribers="subscribers"/>
    </div>
    <div id="video-container" class="col-md-6">
        <user-video class="user-video" :stream-manager="publisher" @click.native="updateMainVideoStreamManager(publisher)" />
        <!-- <user-video class="user-video" :stream-manager="publisher_demo" @click.native="updateMainVideoStreamManager(publisher_demo)" /> -->
        <user-video class="user-video" v-for="sub in subscribers" :key="sub.stream.connection.connectionId" :stream-manager="sub"
          @click.native="updateMainVideoStreamManager(sub)" />
      </div>
    <div class="btn-micro-cam">
      <my-button-mc @click="publishScreenShare">
        <IconShare></IconShare>
      </my-button-mc>
        <my-button-mc style="width:189px" @click="toggleMicrophone">
            <span style="display: flex; align-items: center;">
                <IconMicroOFF v-if="!isMicroActive"></IconMicroOFF>
                <IconMicroON v-else></IconMicroON>
                <span style="display: flex; align-items: center">
                    {{ isMicroActive ? "Выключить микрофон" : "Включить микрофон" }}
                </span>
            </span>
        </my-button-mc>
        <my-button-mc style="width:189px" @click="toggleCamera">
            <span style="display: flex; align-items: center; margin: 5px;">
                <IconCamOFF v-if="!isCamActive"></IconCamOFF>
                <IconCamON v-else></IconCamON>
                <span style="display: flex; align-items: center">
                    {{ isCamActive ? "Выключить камеру" : "Включить камеру" }}
                </span>
            </span>
        </my-button-mc>
        <my-button-mc style="background-color: red;" class="btn btn-large btn-danger" id="buttonLeaveSession" @click="leaveSession">
            <span>Выйти</span>
        </my-button-mc>
    </div>
</template>
<script>
import UserList from "@/components/UserList.vue";
import Chat from "@/components/Chat.vue";
import IconMicroON from './icons/IconMicroON.vue';
import IconMicroOFF from './icons/IconMicroOFF.vue';
import IconShare from './icons/IconShare.vue';
import IconCamOFF from './icons/IconCamOFF.vue';
import IconCamON from './icons/IconCamON.vue';
import { OpenVidu } from "openvidu-browser";
import axios from "axios";
import UserVideo from "@/components/UI/UserVideo.vue"


axios.defaults.headers.post["Content-Type"] = "application/json";

const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000/';
export default {
    props: {
        selectedUser: {
            type: String,
            required: true,
        }
    },
    data() {
        return {
            users: [],
            isMicroActive: true,
            isCamActive: true,

            OV: undefined,
            session: undefined,
            mainStreamManager: undefined,
            publisher: undefined,
            subscribers: [],

            publisher_demo: undefined,

            // Join form
            mySessionId:  window.location.href.split("/").at(-1),
            myUserName: this.selectedUser,

            screensharing: false,

    
        }
    },
    mounted() {
        this.joinSession();
        console.log("--------------", this.subscribers)
        this.getUsers();
    },
    created() {
    console.log('ConfBoard created');
  },
    components: {
        UserList,
        Chat,
        IconMicroON,
        IconMicroOFF,
        IconCamON,
        IconCamOFF,
        UserVideo,
        IconShare,
    },
    computed: {
        // ...mapState(['globalArray'])
    },

    methods: {
      sendMessage({ content, to }) {
      console.log("SEND MESSAGE", content, to)
			let now = new Date();
			let current = now.toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit',
				hour12: false, // true인 경우 오후 10:25와 같이 나타냄.
			});
      

			let messageData = {
				content: content,
				sender: this.myUserName,
				time: current,
			};

			// 전체 메시지
				this.session
					.signal({
						data: JSON.stringify(messageData),
						to: [],
						type: 'public-chat',
					})
					.then(() => {
						console.log('메시지 전송 완료');
					})
					.catch(error => {
						console.log(error);
					});

		},

    speechText({ content }) {
      let messageData = {
          content: content,
          sender: this.myUserName,
          time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })
      };

      this.session.signal({
          data: JSON.stringify(messageData),
          to: [],
          type: "public-audio-text" // Тип для аудио-сообщений
      })
      .then(() => {
          console.log("Аудио-сообщение отправлено успешно");
      })
      .catch(error => {
          console.error("Ошибка при отправке аудио-сообщения:", error);
      });
  },
      
      
        async getUsers() {
            // this.users.push(this.publisher)
            this.users.concat(this.subscribers);
            console.log("USEEEEEEEEEERS", this.users)
            return this.users
            // try {
            //     const currentLink = window.location.href.split("/").at(-1);
            //     const response = await fetch("http://localhost:8000/get-users", {
            //         method: "POST",
            //         headers: {
            //             "Content-Type": "application/json"
            //         },
            //         body: JSON.stringify({ url: currentLink }) // Отправляем параметр currentLink в формате JSON
            //     });
            //     const userDataList = await response.json();

            //     const userList = userDataList.map(userData => {
            //         // Создаем экземпляр класса User для каждого элемента возвращенного списка
            //         return new User(userData.name, userData.role, userData.videoStream, userData.voiceStream);
            //     });

            //     this.users = userList;
            // } catch (error) {
            //     console.error('Ошибка при получении списка пользователей:', error);
            // }
        },
    toggleMicrophone() {
      this.isMicroActive = !this.isMicroActive;
      this.publisher.publishAudio(this.isMicroActive)
    },
    toggleCamera() {
    this.isCamActive = !this.isCamActive;
    this.publisher.publishVideo(this.isCamActive)
    },
    joinSession() {
      // --- 1) Get an OpenVidu object ---
      this.OV = new OpenVidu();

      // --- 2) Init a session ---
      this.session = this.OV.initSession();

      // --- 3) Specify the actions when events take place in the session ---

      // On every new Stream received...
      this.session.on("streamCreated", ({ stream }) => {
        const subscriber = this.session.subscribe(stream);
        console.log("SUBBBBBB", subscriber);
        this.subscribers.push(subscriber);
      });

      // On every Stream destroyed...
      this.session.on("streamDestroyed", ({ stream }) => {
        const index = this.subscribers.indexOf(stream.streamManager, 0);
        if (index >= 0) {
          this.subscribers.splice(index, 1);
        }
      });

      // On every asynchronous exception...
      this.session.on("exception", ({ exception }) => {
        console.warn(exception);
      });

      this.session.on('signal:public-chat', event => {
				this.$refs.chat.addMessage(
					event.data,
					JSON.parse(event.data).sender === this.myUserName,
					false,
				);
			});
      
    this.session.on('signal:public-audio-text', event => {
      let messageData = JSON.parse(event.data);
      
      // Создание и воспроизведение аудио из текста
      const utterance = new SpeechSynthesisUtterance(messageData.content);
      const voices = speechSynthesis.getVoices();
      utterance.voice = voices[0]; 
      speechSynthesis.speak(utterance);
  });

      // --- 4) Connect to the session with a valid user token ---

      // Get a token from the OpenVidu deployment
      this.getToken(this.mySessionId).then((token) => {

        // First param is the token. Second param can be retrieved by every user on event
        // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
        this.session.connect(token, { clientData: this.myUserName })
          .then(() => {

            // --- 5) Get your own camera stream with the desired properties ---

            // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
            // element: we will manage it on our own) and with the desired properties
            let publisher = this.OV.initPublisher(undefined, {
              audioSource: undefined, // The source of audio. If undefined default microphone
              videoSource: undefined, // The source of video. If undefined default webcam
              publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
              publishVideo: true, // Whether you want to start publishing with your video enabled or not
              resolution: "385x225", // The resolution of your video
              frameRate: 30, // The frame rate of your video
              insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
              mirror: false, // Whether to mirror your local video or not
            });

            // Set the main video in the page to display our webcam and store our Publisher
            this.mainStreamManager = publisher;
            this.publisher = publisher;

            // --- 6) Publish your stream ---

            this.session.publish(this.publisher);
          })
          .catch((error) => {
            console.log("There was an error connecting to the session:", error.code, error.message);
          });
      });

      window.addEventListener("beforeunload", this.leaveSession);
    },


    publishScreenShare() {

  // Получаем поток с демонстрацией экрана
  navigator.mediaDevices.getDisplayMedia()
      .then(function(stream) {
          // Получаем видео трек с потока
          var videoTrack = stream.getVideoTracks()[0];

          // Заменяем поток в Publisher на видео трек с демонстрацией экрана
          this.publisher.replaceTrack(videoTrack);

      })
      .catch(function(error) {
          console.error("Ошибка при получении демонстрации экрана: ", error);
      });

  //       this.getToken(this.mySessionId).then((token) => {
  // this.session.connect(token)
  // .then(() => {
  //         this.publisher_demo = this.OV.initPublisher(undefined, { videoSource: "screen" });
  //         // this.session.publish(this.publisher_demo);
        

  //     }).catch((error => {
  //         console.warn('There was an error connecting to the session:', error.code, error.message);

  //     }));
  // });
  },

    leaveSession() {
      // --- 7) Leave the session by calling 'disconnect' method over the Session object ---
      if (this.session) this.session.disconnect();

      // Empty all properties...
      this.session = undefined;
      this.mainStreamManager = undefined;
      this.publisher = undefined;
      this.subscribers = [];
      this.OV = undefined;
      this.users = [];

      // Remove beforeunload listener
      window.removeEventListener("beforeunload", this.leaveSession);
      this.$router.push("/")
    },

    updateMainVideoStreamManager(stream) {
      if (this.mainStreamManager === stream) return;
      this.mainStreamManager = stream;
    },

    /**
     * --------------------------------------------
     * GETTING A TOKEN FROM YOUR APPLICATION SERVER
     * --------------------------------------------
     * The methods below request the creation of a Session and a Token to
     * your application server. This keeps your OpenVidu deployment secure.
     *
     * In this sample code, there is no user control at all. Anybody could
     * access your application server endpoints! In a real production
     * environment, your application server must identify the user to allow
     * access to the endpoints.
     *
     * Visit https://docs.openvidu.io/en/stable/application-server to learn
     * more about the integration of OpenVidu in your application server.
     */
    async getToken(mySessionId) {
      const sessionId = await this.createSession(mySessionId);
      return await this.createToken(sessionId);
    },

    async createSession(sessionId) {
      const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions', { customSessionId: sessionId }, {
        headers: { 'Content-Type': 'application/json', },
      });
      return response.data; // The sessionId
    },

    async createToken(sessionId) {
      const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections', {}, {
        headers: { 'Content-Type': 'application/json', },
      });
      return response.data; // The token
    },

        // Это здесь только для теста
        //     ...mapMutations(['addToGlobalArray', 'removeFromGlobalArray']),
        //     addItem() {
        //       this.addToGlobalArray('Новый элемент'); // Добавление элемента в глобальный массив
        //     },
        //     removeItem(index) {
        //       this.removeFromGlobalArray(index); // Удаление элемента из глобального массива
        //     }
    },
    
}
</script>
<style scoped>
.users-chat {
    display: inline;
    float: left;
    width: 400px;
    height: 897px;
    border-radius: 15px;
    background: rgba(217, 217, 217, 1);
}

.users--list {
    overflow-y: scroll;
    background: rgba(93, 11, 161, 1);
    display: inline;
    float: left;
    width: 385px;
    height: 437px;
    border-radius: 15px;
    margin: 8px;
}

.btn-micro-cam {
    left: 40%;
    display: flex;
    justify-content: space-evenly;
    align-items: flex-end;
    position: fixed;
    bottom: 20px;
    width: 580px;
}

.users--list::-webkit-scrollbar {
    width: 1px;
    /* Устанавливаем ширину ползунка */
}

.users--list::-webkit-scrollbar-thumb {
    background-color: transparent;
    /* Устанавливаем прозрачный цвет ползунка */
}

.users--list::-webkit-scrollbar-track {
    background-color: transparent;
    /* Устанавливаем прозрачный цвет трека */
}


#video-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.user-video {
  flex-basis: 33.33%;
  margin: 2%; /* расположение 3 камер на одной линии, можно изменить значение для другого количества */
}
</style>