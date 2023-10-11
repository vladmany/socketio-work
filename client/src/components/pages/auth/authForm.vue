<template>
    <div class="form-wrapper">
        <form @submit.prevent="$emit('send', form)">

            <div class="field"><label>Логин </label><input type="text" v-model="form.username"></div>
            <div class="field"><label>Пароль </label><input type="password" v-model="form.password"></div>
            <button>{{ buttonLabel }}</button>
        </form>
    </div>
</template>

<script>
export default {
	name: "authForm",
    props: ['buttonLabel'],
    data() {
		return {
			form: {
				username: '',
                password: '',
            }
        }
    }
}
</script>

<style scoped>
    .field {
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
    }
    .form-wrapper {
        width: 250px;
        margin-left: auto;
        margin-right: auto;
    }
    .form-wrapper button {
        width: 100%;
        height: 30px;
        margin-top: 15px;
    }
</style>