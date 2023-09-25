import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { changePassword, currentAuthenticatedUser, getCurrentSession, updateUserEmail, verifyEmailValidationCode } from "$lib/utils/auth";

export const load: PageServerLoad = async ({ parent }) => {
    const data = await parent();
    return data
  }
    

export const actions = {
  resetPwd: async ({ request }) => {		
    const formData = await request.formData();
    const oldPassword = String(formData.get('oldPassword'));
    const newPassword = String(formData.get('newPassword'));
    
      await changePassword(await currentAuthenticatedUser(), oldPassword, newPassword)
  },
  resetEmail: async ({ request, locals }) => {		
    const formData = await request.formData();
    const newEmail = String(formData.get('newEmail'));

    await updateUserEmail(locals.user, newEmail)
    
  },
  confirmNewEmail: async ({ request }) => {		
    const formData = await request.formData();
    const code = String(formData.get('code'));
    await verifyEmailValidationCode(code)
    
  }
} satisfies Actions;
