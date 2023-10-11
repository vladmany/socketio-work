<template>
    <div v-if="isLoading">
        <h1>Loading...</h1>
    </div>
    <div v-else>
        <chat v-if="socket && user" :user="user" :socket="socket"/>
    </div>
</template>

<script>
import axios from "axios";
import Chat from "@/components/pages/chat/Chat.vue";
const { io } = require("socket.io-client");

export default {
	name: "index",
    components: {Chat},
    data() {
		return {
			token: null,
			isLoading: true,
            user: null,
            socket: null,
        }
    },
    methods: {
		openSocket() {
			this.socket = io("http://localhost:3000", {
				query: {
					token: this.token,
				}
			});

            this.socket.on('connect', () => this.isLoading = false);
        }
    },
    created() {
		this.token = sessionStorage.getItem('authToken');
		if (!this.token)
			this.$router.push('/login');

		axios.get('http://localhost:3001/user', {headers: {Authorization: `Bearer ${this.token}`}})
			.then(response => {
                this.user = response.data;
				this.openSocket();
			})
			.catch(e => {
				sessionStorage.removeItem('authToken');
				this.$router.push('/login');
			})
    }
}
</script>

<style scoped>

</style>