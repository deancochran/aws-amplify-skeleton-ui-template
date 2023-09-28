import type { Handle } from '@sveltejs/kit';
import { currentAuthenticatedUser, getCurrentSession } from '$lib/utils/auth';
export const handle: Handle = async ({ event, resolve }) => {

	try{
		const _session = await getCurrentSession();
		if (!_session) {
			return await resolve(event);
		}
		event.locals.user = await currentAuthenticatedUser()
		return await resolve(event);

	}catch(err){
		return await resolve(event);
	}
};