<template>
    <div class="user">
        <span>{{ clientData }}</span>
    </div>
</template>

<script>
import User from "@/components/User.js";
export default {
    props: {
        streamManager: Object,
    },
    computed: {
		clientData () {
			const { clientData } = this.getConnectionData();
			return clientData;
		},
	},

	methods: {
		getConnectionData () {
            console.log("!!!!!!!!!!!!", this.streamManager);
			const { connection } = this.streamManager.stream;
			return JSON.parse(connection.data);
		},
	},
}
</script>

<style scoped>
.user {
    background: rgba(0, 0, 0, 0.4);
    width: 307px;
    height: 35px;
    border-radius: 15px;
    margin: 5px;
}

span {
    font-size: 20px;
    font-family: 'Inter';
    color: white;
    margin: 10px;
}
</style>