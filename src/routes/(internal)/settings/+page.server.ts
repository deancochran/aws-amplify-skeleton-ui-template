import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { changePassword } from "$lib/utils/auth";

export const load: PageServerLoad = async ({ locals, parent }) => {
    const data = await parent();
    return data
    
  }
    

export const actions = {
  reset: async ({ request,locals }) => {		
    const formData = await request.formData();
    const oldPassword = String(formData.get('oldPassword'));
    const newPassword = String(formData.get('newPassword'));
    
        try{
            await changePassword(locals.user, oldPassword, newPassword)
        }catch(err){
            console.log("error while signing up",err)
        }
  }
} satisfies Actions;
