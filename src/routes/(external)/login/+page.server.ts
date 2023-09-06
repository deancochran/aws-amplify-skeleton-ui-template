// import { redirect } from "@sveltejs/kit"

import type { LogIn } from "$lib/types/auth";
import { signIn } from "$lib/utils/auth.js";
import { fail, redirect } from "@sveltejs/kit";

import type { Actions } from './$types';
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, parent }) => {
    await parent();
    if(locals.user){
        redirect(303,'/settings')
    }
  }
    

export const actions = {
    login: async ({ cookies, request }) => {
        const data = await request.formData();
        const username = String(data.get('username'))
        // const email = String(data.get('email'));
        const password = String(data.get('password'));
        const login:LogIn = { username, password }
        

        // const user = await db.getUser(email);
        // cookies.set('sessionid', await db.createSession(user));

        return { success: true };
    },
	register: async (event) => {
		// TODO register the user
        redirect(303, '/register')
	}
} satisfies Actions;


