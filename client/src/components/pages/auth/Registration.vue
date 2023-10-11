<template>
    <h3>Регистрация</h3>
    <auth-form button-label="Зарегистрироваться" @send="send" />
    <div style="margin-top: 15px;">
        <a href="/login">Вход</a>
    </div>
</template>

<script>
import authForm from "@/components/pages/auth/authForm.vue";
import axios from "axios";

export default {
	name: "Registration",
    components: {authForm},
    methods: {
		send(form) {
            axios.post('http://localhost:3001/register', form)
                .then((response) => {
					alert('Вы успешно зарегистрированы. Войдите в аккаунт.');
					this.$router.push('/login');
                })
                .catch(e => {
					console.log(e);
					alert('Ошибка авторизации');
                })
        }
    }
}
</script>

<style scoped>

</style>