import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { currentAuthenticatedUser, deleteUser } from '$lib/utils/auth';


export const DELETE: RequestHandler = async ({locals}) => {
    try {
        locals.user = await currentAuthenticatedUser();
        const body:BodyInit=String(await deleteUser());
        return new Response(body);
    } catch (err) {
        throw error(409, `${err}`)
    }    
    
};