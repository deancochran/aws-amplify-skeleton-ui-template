import { redirect } from '@sveltejs/kit';

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
        }catch(err){
            console.log("error while signing up",err)
        }
	}
} satisfies Actions;
