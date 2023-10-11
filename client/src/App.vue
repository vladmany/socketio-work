<template>
<!--    <login-form v-if="!nickname" @login="enterChat"/>-->
<!--    <chat v-if="socket && nickname" :socket="socket" :nickname="nickname" :chat-history="chatHistory"/>-->
    <router-view></router-view>
</template>

<script>
// import LoginForm from "@/components/pages/chat/LoginForm";
// import Chat from "@/components/pages/chat/Chat";
// const { io } = require("socket.io-client");

export default {
    name: 'App',
	components: {
		// LoginForm,
        // Chat
	},
    data() {
		return {
	        // nickname: null,
            // socket: null,
            // chatHistory: null,
        }
    },
    methods: {
		// enterChat(nickname) {
		// 	this.socket = io("http://localhost:3000", {
		// 		query: {
		// 			nickname,
        //         }
        //     });
        //
		// 	this.socket.on('connect', () => {
		// 		this.nickname = nickname;
		// 		this.socket.on('connected', (args) => {
		// 			this.chatHistory = args.chatHistory;
        //         })
        //     });
        // }
    },
    created() {
		// const token = sessionStorage.getItem('authToken');
        // if (token) {
		// 	this.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		// 	this.axios.interceptors.response.use((response) => response, (error) => {
		// 		if (error.response.status === 403) {
		// 			sessionStorage.removeItem('authToken'); // удалять токен при каждой 403 ошибке
		// 		}
		// 		return Promise.reject(error);
		// 	});
        // } else {
		// 	delete this.axios.defaults.headers.common['Authorization'];
        // }
	}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
