import { fail, redirect } from '@sveltejs/kit';

import type { Actions } from './$types';
import type { PageServerLoad } from './$types';
import { forgotPasswordSubmit } from '$lib/utils/auth';

export const load: PageServerLoad = async ({ parent, locals }) => {
	const data = await parent();
	if (locals.user) {
		throw redirect(303, '/settings');
	}
};

export const actions = {
	reset: async ({ request }) => {		
        const formData = await request.formData();
		const username = String(formData.get('username'));
		const code = String(formData.get('code'));
		const newPassword = String(formData.get('newPassword'));
		
        try{
            await forgotPasswordSubmit(username,code,newPassword)
        }catch(err){
            return fail(500, {
				description: 'Error in forgotPasswordSubmit',
				error: err
			});
        }
	}
} satisfies Actions;
