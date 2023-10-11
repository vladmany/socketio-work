<template>
    <h1>Чтобы войти в чат введите ваш никнейм</h1>
    <form @submit.prevent="login">
        <input type="text" v-model="nickname">
        <button>Войти</button>
    </form>
</template>

<script>
export default {
	name: "LoginForm",
    emits: ['login'],
    data() {
		return {
			nickname: '',
        }
    },
    methods: {
		login() {
			if (!this.nickname.length) {
				alert('Некорректный никнейм');
				return;
            }

            this.$emit('login', this.nickname)
        }
    }
}
</script>

<style scoped>

</style>