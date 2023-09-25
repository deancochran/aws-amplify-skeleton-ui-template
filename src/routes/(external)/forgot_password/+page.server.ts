import { fail, redirect } from '@sveltejs/kit';

import type { Actions } from './$types';
import type { PageServerLoad } from './$types';
import { forgotPassword } from '$lib/utils/auth';

export const load: PageServerLoad = async ({ parent }) => {
	const data = await parent();
	if (data.user) {
		throw redirect(303, '/settings');
	}
};

export const actions = {
	forgot: async ({ request }) => {		
        const formData = await request.formData();
		const username = String(formData.get('username'));
		
        try{
            await forgotPassword(username)
			return { success: true };
        }catch(err){
            return fail(500, {
				description: 'Error in forgotPassword',
				error: err
			});
        }
	}
} satisfies Actions;
