import { confirmSignUp, resendSignUp } from "$lib/utils/auth";
import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, parent }) => {
    const data = await parent()
	if (locals.user) {
		throw redirect(302, '/');
	}
};

export const actions = {
	confirm: async ({ request }) => {
		const formData = await request.formData();
		const username = String(formData.get('username'));
        const code = String(formData.get('code'));
		
        try{
            await confirmSignUp({ username, code })
            return { success: true };
        }catch(err){
            return fail(500, {
				description: 'Error in confirmSignUp',
				error: err
			});
        }
		
		
	},
    resend: async ({ request }) => {
        const formData = await request.formData();
		const username = String(formData.get('username'));
        try{
            await resendSignUp({username})
            return { success: true };
        }catch(err){
            return fail(500, {
				description: 'Error in resendSignUp',
				error: err
			});
        }
	}

    
};
