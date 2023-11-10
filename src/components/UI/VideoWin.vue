<template>
    <div>
        <video ref="videoElement" autoplay></video>
    </div>
</template>

<script>
export default {
    data() {
        return {
            stream: null,
        };
    },
    methods: {
        startCamera() {
            if (!this.stream) {
                navigator.mediaDevices
                    .getUserMedia({ video: true })
                    .then((stream) => {
                        this.$refs.videoElement.srcObject = stream;
                        this.stream = stream;
                    })
                    .catch((error) => {
                        console.error('Ошибка при включении камеры:', error);
                    });
            }
        },
        stopCamera() {
            if (this.stream) {
                this.stream.getTracks().forEach((track) => {
                    track.stop();
                });
                this.$refs.videoElement.srcObject = null;
                this.stream = null;
            }
        },
    },
};
</script>

<style scoped>
video {
    border-radius: 25px;
    width: 100%;
    height: 100%;
}
</style>