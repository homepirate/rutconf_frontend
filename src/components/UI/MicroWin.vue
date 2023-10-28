<!--<template>
    <div class="microphone-volume">
        <div class="volume-meter">
            <div class="volume-fill" v-for="(color, index) in volumeColors" :key="index" :style="{ width: `${volume}%`, backgroundColor: color }"></div>
        </div>
    </div>
</template>-->

<template>
    <div class="microphone-volume">
        <div class="volume-meter">
            <div class="volume-meter-container">
                <div class="volume-fill" v-for="(color, index) in volumeColors" :key="index" :style="{ width: `${volume}%`, backgroundColor: color }"></div>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        props: {
            isMicroActive: Boolean, // Передаем статус активации микрофона
        },
        data() {
            return {
                volume: 0, // Начальное значение громкости
                volumeColors: ['#c4c4c4', '#c4c4c4', '#c4c4c4', '#c4c4c4', '#c4c4c4', '#c4c4c4', '#c4c4c4'], // Цвета для шкалы громкости
                microphone: null,
            };
        },
        methods: {
            initializeMicrophone() {
                if (this.isMicroActive) {
                    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    const analyser = audioContext.createAnalyser();

                    navigator.mediaDevices
                        .getUserMedia({ audio: true })
                        .then((stream) => {
                            this.microphone = audioContext.createMediaStreamSource(stream);
                            this.microphone.connect(analyser);
                            analyser.connect(audioContext.destination);

                            analyser.fftSize = 256;
                            const bufferLength = analyser.frequencyBinCount;
                            const dataArray = new Uint8Array(bufferLength);

                            this.analyzeVolume(analyser, dataArray);
                        })
                        .catch((error) => {
                            console.error('Ошибка при активации микрофона:', error);
                        });
                }
            },
            analyzeVolume(analyser, dataArray) {
                const updateVolume = () => {
                    analyser.getByteFrequencyData(dataArray);
                    const sum = dataArray.reduce((acc, value) => acc + value, 0);
                    const average = sum / dataArray.length;
                    this.volume = (average / 256) * 100; // Преобразуем в проценты
                    requestAnimationFrame(updateVolume);
                };
                updateVolume();
            },
            stopMicrophone() {
                if (this.microphone) {
                    const tracks = this.microphone.mediaStream.getAudioTracks();
                    tracks.forEach((track) => {
                        track.stop();
                    });
                    this.microphone = null;
                    this.volume = 0;
                }
            },
        },
    };
</script>


<!--<style scoped>
    .microphone-volume {
        display: flex;
        align-items: center;
        margin: 0 auto;
        background: rgba(0, 0, 0, 0.7);
    }

    .volume-meter {
        width: 100%;
        height: 80px;
        background: rgb(67, 53, 76);
        display: flex;
    }

    .volume-fill {
        height: 100%;
        transition: width 0.2s ease-out;
    }
</style>-->

<style scoped>
    .microphone-volume {
        display: flex;
        align-items: center;
        margin: 0 auto;
        background: rgba(0, 0, 0, 0.7);
    }

    .volume-meter {
        width: 100%;
        height: 80px;
        background: rgb(67, 53, 76);
        display: flex;
        justify-content: center; /* Выравнивание по центру горизонтально */
        /*align-items: center;*/ /* Выравнивание по центру вертикально */
    }

    .volume-meter-container {
        padding: 10px; /* Отступы вокруг volume-fill */
        width: 100%;
        height: 100%;
        background: rgb(67, 53, 76);
        display: flex;
        flex-wrap: nowrap; /* Отменяем перенос линий, чтобы они не занимали весь фон */
    }

    .volume-fill {
        height: 100%;
        transition: width 0.2s ease-out;
    }
</style>
