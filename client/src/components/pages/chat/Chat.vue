<template>
    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">

        <channels :socket="socket"/>
        <online-counter :socket="socket"/>
    </div>
    <div style="border: 1px solid black; padding: 5px; text-align: left; height: 500px; overflow-x: clip; overflow-y: scroll;">
        <ul style="list-style: none; margin: 0; padding: 0; position: relative; bottom: 0;">
            <li
                    :style="!message.User ? 'color: #5f5fc5' : ''"
                    v-for="message in chatMessages">
                <strong :style="message.User ? 'cursor: pointer' : ''" @click="privateChat(message.User.id)">[{{ message.User ? message.User.username : "SERVER" }}]:</strong>
                {{ message.message }}
            </li>
        </ul>
    </div>
    <form @submit.prevent="sendMessage" style="text-align: left; margin-top: 5px;">
        <span>[{{ activeChannel }}] {{ user.username }}: </span>
        <input v-model="message" type="text" style="width: 25%; margin-right: 5px">
        <button>Отправить</button>
    </form>
</template>

<script>
import Channels from "@/components/pages/chat/Channels";
import OnlineCounter from "@/components/pages/chat/OnlineCounter";

export default {
	name: "Chat",
	components: {OnlineCounter, Channels},
	props: ['socket', 'user'],
	data() {
		return {
			chatMessages: [],
			message: '',
			activeChannel: '',
		}
	},
	methods: {
		sendMessage() {
			if (!this.message.length) {
				alert('Введите сообщение!');
				return;
			}

			this.socket.emit('message', {text: this.message});
			this.message = '';
		},
		privateChat(userId) {
			this.socket.emit('private-chat-request', userId);
		}
	},
	created() {
		this.socket.on('set-history', (history) => this.chatMessages = history);

		this.socket.on('message', (args) => this.chatMessages.push(args.message));

		this.socket.on('joined-room', (channel) => this.activeChannel = channel.name);
	}
}
</script>

<style scoped>

</style>
