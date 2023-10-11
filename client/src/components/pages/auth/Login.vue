<template>
    <h3>Вход</h3>
    <auth-form button-label="Вход" @send="send" />
    <div style="margin-top: 15px;">
        <a href="/register">Регистрация</a>
    </div>
</template>

<script>
import axios from "axios";
import authForm from "@/components/pages/auth/authForm.vue";

export default {
	name: "Login",
	components: {authForm},
    methods: {
		send(form) {
			axios.post('http://localhost:3001/login', form)
				.then((response) => {
					sessionStorage.setItem('authToken', response.data.token);
					this.$router.push('/');
				})
				.catch(e => {
					console.log(e);
					alert('Ошибка авторизации');
				})
        }
    },
	created() {
		// axios.get('http://localhost:3001/user')
        //     .then((response) => {
		// 		console.log(response)
        //     })
        //     .catch(e => console.log(e));
	}
}
</script>

<style scoped>

</style>