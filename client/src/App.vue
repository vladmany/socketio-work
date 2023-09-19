<template>
    <login-form v-if="!nickname" @login="enterChat"/>
    <chat v-if="socket && nickname" :socket="socket" :nickname="nickname" :chat-history="chatHistory"/>
</template>

<script>
import LoginForm from "@/components/LoginForm";
import Chat from "@/components/Chat";
const { io } = require("socket.io-client");

export default {
    name: 'App',
	components: {
		LoginForm,
        Chat
	},
    data() {
		return {
	        nickname: null,
            socket: null,
            chatHistory: null,
        }
    },
    methods: {
		enterChat(nickname) {
			this.socket = io("http://localhost:3000", {
				query: {
					nickname,
                }
            });

			this.socket.on('connect', () => {
				this.nickname = nickname;
				this.socket.on('connected', (args) => {
					this.chatHistory = args.chatHistory;
                })
            });
        }
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
