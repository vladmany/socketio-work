import Login from "@/components/pages/auth/Login.vue";
import Registration from "@/components/pages/auth/Registration.vue";
import {createRouter, createWebHashHistory, createWebHistory, useRouter} from "vue-router";
import ChatIndex from "@/components/pages/chat/index.vue";

const router = [
	{
		path: '/',
		component: ChatIndex,
		// beforeEnter: (to, from, next) => {
			// console.log(to)
			// const store = useStore();
			// const router = useRouter();
			//
			// const user = store.getters.getUser
			// if (!user) {
			// 	router.push('/login');
			// }
		// }
	},
	{ path: '/login', component: Login},
	{ path: '/register', component: Registration},
];

export default createRouter({
	history: createWebHistory(),
	routes: router,
});