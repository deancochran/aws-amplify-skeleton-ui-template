import { confirmSignUp, resendSignUp } from "$lib/utils/auth";
import { error, redirect } from "@sveltejs/kit";
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
        }catch(err){
            throw error(400, `${err}`);
        }
        throw redirect(303, '/settings');
		
	},
    resend: async ({ request }) => {
        const formData = await request.formData();
		const username = String(formData.get('username'));
        try{
            await resendSignUp({username})
        }catch(err){
            throw error(400, `${err}`);
        }
        return { success: true };
	}

    
};
