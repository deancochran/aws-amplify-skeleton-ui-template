import { confirmSignUp, currentAuthenticatedUser, resendSignUp } from "$lib/utils/auth";
import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { invalidateAll } from "$app/navigation";

export const load: PageServerLoad = async ({ locals, parent }) => {
    const data = await parent()
	if (locals.user) {
		throw redirect(302, '/confirm');
	}
};

export const actions = {
    resend: async ({ request }) => {
        const formData = await request.formData();
		const username = String(formData.get('username'));
        try{
            await resendSignUp({username})
            
        }catch(err){
            throw error(400, `${err}`);
        }
        throw redirect(303, '/confirm');
        
	}


};
