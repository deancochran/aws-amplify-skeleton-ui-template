// import { redirect } from "@sveltejs/kit"

import type { LogIn } from '$lib/types/auth';
import { signIn } from '$lib/utils/auth.js';
import { redirect } from '@sveltejs/kit';

import type { Actions } from './$types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const data = await parent();
	if (data.user) {
		throw redirect(303, '/settings');
	}
};

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const username = String(data.get('username'));
		// const email = String(data.get('email'));
		const password = String(data.get('password'));
		const login: LogIn = { username, password };

        let user = undefined;
		try {
			user = await signIn(login);
		} catch (err) {
			console.log('display err to user:', err);
		}
		if (user) {
			throw redirect(303, '/settings');
		}
	}
} satisfies Actions;
