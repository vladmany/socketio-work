<template>
    <div style="display: flex">
        <strong>Каналы:</strong>
        <div style="width: 350px; display: flex; flex-direction: row; justify-content: space-around">
            <button v-for="channel in channels" @click.prevent="joinChannel(channel)">{{ channel.name }}
                ({{ online[channel.id] ?? 0 }})
            </button>
        </div>
    </div>
</template>

<script>
export default {
	name: "Channels",
	props: ['socket'],
	data() {
		return {
			channels: [],
			online: {},
		}
	},
	methods: {
		joinChannel(channel) {
			this.socket.emit('join-room', channel.id);
		}
	},
	created() {
		this.socket.on('set-online', (data) => {
			this.online = data;
		});

		this.socket.on('private-chat-accept', (room) => {
			this.channels.push(room);
		});

		this.socket.on('set-rooms', (channels) => this.channels = channels);
	}
}
</script>

<style scoped>
</style>
