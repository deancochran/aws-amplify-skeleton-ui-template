import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { signUp } from '$lib/utils/auth';

export const load: PageServerLoad = async ({ parent }) => {
	const data = await parent();
	if (data.user) {
		throw redirect(303, '/settings');
	}
};


export const actions = {
	register: async ({ request }) => {
		const formData = await request.formData();
		const username = String(formData.get('username'));
		const email = String(formData.get('email'));
		const password = String(formData.get('password'));
		const val_password = String(formData.get('val-password'));
		if (password != val_password) {
			throw error(400, `Passwords do not match`);
		} else {
			try{
				await signUp({ username, password, email });
			}catch(err){
				throw error(400, `${err}`);
			}
			throw redirect(303, '/confirm');
			
			
		}
	}
};
