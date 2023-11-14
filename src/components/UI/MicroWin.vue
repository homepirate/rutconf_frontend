
<template>
    <div class="volume-meter">
        <div class="volume-meter-container">
            <div class="volume-fill" v-for="(color, index) in volumeColors" :key="index"
                :style="{ width: `${this.calculateWidth()}%`, backgroundColor: color }"></div>
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
            volumeColors: ['#AD7AEF', '#AD7AEF', '#AD7AEF', '#AD7AEF', '#AD7AEF', '#AD7AEF', '#AD7AEF'], // Цвета для шкалы громкости
            microphone: null,
        };
    },
    methods: {
        initializeMicrophone() {
            if (this.isMicroActive) {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 44100 });
                const analyser = audioContext.createAnalyser();

                navigator.mediaDevices
                    .getUserMedia({ audio: true })
                    .then((stream) => {
                        this.microphone = audioContext.createMediaStreamSource(stream);
                        this.microphone.connect(analyser);
                        analyser.connect(audioContext.destination);

                        analyser.fftSize = 2048;
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
        calculateWidth() {
            if (this.volume === 0) {
                return 0;
            }
            else if (this.volume <= 5) {
                return 1;
            }
            else if (this.volume >= 80) {
                return 50;
            }
            else { return this.volume };
        },
    },
};
</script>

<style scoped>
.volume-meter {
    width: 100%;
    height: 100%;
    background: rgb(67, 53, 76);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.volume-meter-container {
    width: 100%;
    height: 50%;
    background: rgb(67, 53, 76);
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: center;
}

.volume-fill {
    height: 100%;
    transition: width 0.2s ease-out;
    border-radius: 25px;
}
</style>
