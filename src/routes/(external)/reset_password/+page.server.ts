import { redirect } from '@sveltejs/kit';

import type { Actions } from './$types';
import type { PageServerLoad } from './$types';
import { forgotPasswordSubmit } from '$lib/utils/auth';

export const load: PageServerLoad = async ({ parent }) => {
	const data = await parent();
	if (data.user) {
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
            console.log("error while signing up",err)
        }
	}
} satisfies Actions;
