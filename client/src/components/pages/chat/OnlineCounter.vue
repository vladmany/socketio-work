<template>
    <strong>Общий онлайн: {{online}}</strong>
</template>

<script>
export default {
	name: "OnlineCounter",
    props: ['socket'],
    data() {
		return {
			online: 0,
        }
    },
    created() {
		this.socket.on('set-online', (data) => {
			this.online = data['all'];
        });
    }
}
</script>

<style scoped>

</style>