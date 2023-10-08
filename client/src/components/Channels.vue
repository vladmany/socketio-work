<template>
  <div style="display: flex">
    <strong>Каналы:</strong>
    <div style="width: 350px; display: flex; flex-direction: row; justify-content: space-around">
      <button v-for="channel in channels" @click.prevent="changeChannel(channel)">{{channel}} ({{online[channel] ?? 0}})</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Channels",
  props: ['socket'],
  data() {
    return {
		channels: [
			'general',
            'music',
            'cinema',
            'games',
        ],
        online: {},
    }
  },
  methods: {
    changeChannel(channel) {
      this.socket.emit('change-channel', {channel});
      this.$emit('change-channel', channel);
    }
  },
    created() {
		this.socket.on('update-online', (data) => {
			this.online = data;
		});

		this.socket.on('private-chat-accept', (roomName) => {
			this.channels.push(roomName);
        });
	}
}
</script>

<style scoped>
</style>
