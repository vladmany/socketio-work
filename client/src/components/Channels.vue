<template>
  <div style="display: flex">
    <strong>Каналы:</strong>
    <div style="width: 300px; display: flex; flex-direction: row; justify-content: space-around">
      <button @click.prevent="changeChannel('general')">general</button>
      <button @click.prevent="changeChannel('music')">music</button>
      <button @click.prevent="changeChannel('cinema')">cinema</button>
      <button @click.prevent="changeChannel('games')">games</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Channels",
  props: ['socket'],
  data() {
    return {

    }
  },
  methods: {
    changeChannel(channel) {
      this.socket.emit('change-channel', {channel});
      this.$emit('change-channel', channel);
    }
  }
}
</script>

<style scoped>
</style>
