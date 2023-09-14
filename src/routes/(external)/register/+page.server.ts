import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { signUp } from '$lib/utils/auth';

export const load: PageServerLoad = async ({ parent }) => {
	const data = await parent();
	if (data.user) {
		throw redirect(303, '/settings');
	}
};


export const actions = {
	default: async ({ request }:{request:Request}) => {
		const formData = await request.formData();
		const username = String(formData.get('username'));
		const email = String(formData.get('email'));
		const password = String(formData.get('password'));
		const val_password = String(formData.get('val-password'));
		let user = undefined;
		if (password != val_password) {
			console.log('display error display passwords must match')
		} else {
			user = await signUp({ username, password, email });
			if(user){throw redirect(303, '/confirm')}
		}
	}
};
