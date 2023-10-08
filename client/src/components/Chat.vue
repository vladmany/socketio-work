<template>
    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
        <channels :socket="socket"/>
        <online-counter :socket="socket"/>
    </div>
    <div style="border: 1px solid black; padding: 5px; text-align: left; height: 500px; overflow-x: clip; overflow-y: scroll;">
        <ul style="list-style: none; margin: 0; padding: 0; position: relative; bottom: 0;">
            <li
                :style="message.from === 'SERVER' ? 'color: #5f5fc5' : ''"
                v-for="message in chatMessages">
                    <strong :style="message.from !== 'SERVER' ? 'cursor: pointer' : ''" @click="privateChat(message.from)">[{{message.from}}]:</strong> {{message.text}}
            </li>
        </ul>
    </div>
    <form @submit.prevent="sendMessage" style="text-align: left; margin-top: 5px;">
        <span>[{{activeChannel}}] {{nickname}}: </span>
        <input v-model="message" type="text" style="width: 25%; margin-right: 5px">
        <button>Отправить</button>
    </form>
</template>

<script>
import Channels from "@/components/Channels";
import OnlineCounter from "@/components/OnlineCounter";
export default {
	name: "Chat",
  components: {OnlineCounter, Channels},
  props: ['socket', 'nickname', 'chatHistory'],
    data() {
		return {
			chatMessages: [],
            message: '',
      activeChannel: 'general',
        }
    },
    methods: {
		sendMessage() {
			if (!this.message.length) {
				alert('Введите сообщение!');
				return;
            }

			this.socket.emit('message', {from: this.nickname, text: this.message});
			this.message = '';
        },
        privateChat(nickname) {
            this.socket.emit('private-chat-request', nickname);
        }
    },
    created() {
	    this.chatMessages.push(...this.chatHistory);

		this.socket.on('message', (args) => this.chatMessages.push({from: args.from, text: args.text}));

		this.socket.on('join-channel', (channel) => this.activeChannel = channel);
	}
}
</script>

<style scoped>

</style>
