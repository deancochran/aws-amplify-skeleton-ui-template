import { confirmSignUp, resendSignUp } from "$lib/utils/auth";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { Auth } from "aws-amplify";

export const load: PageServerLoad = async ({ locals, parent }) => {
    await parent()
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
            await confirmSignUp({ username, code });
        }catch(err){
            console.log("error while signing up",err)
        }
		
		
	},
    resend: async ({ request }) => {
		
        const formData = await request.formData();
		const username = String(formData.get('username'));
		
        try{
            await resendSignUp({username})
        }catch(err){
            console.log("error while signing up",err)
        }
	}

    
};
