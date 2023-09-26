// import { redirect } from "@sveltejs/kit"

import type { LogIn } from '$lib/types/auth';
import { signIn } from '$lib/utils/auth.js';
import { error, fail, redirect } from '@sveltejs/kit';

import type { Actions } from './$types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const data = await parent();
	if (data.user) {
		throw redirect(303, '/settings');
	}
};

export const actions = {
	login: async ({ request }) => {
		const data = await request.formData();
		const username = String(data.get('username'));
		const password = String(data.get('password'));
		const login: LogIn = { username, password };
		try {
			await signIn(login);
		} catch (err) {
			throw error(409, `${err}`)
		}
		throw redirect(303, '/settings');
		
	}
} satisfies Actions;
