import type { Handle } from '@sveltejs/kit';
import { currentAuthenticatedUser, getCurrentSession } from '$lib/utils/auth';

export const handle: Handle = async ({ event, resolve }) => {
	// Get the user data from Amplify.
	try{
		const _session = await getCurrentSession();
		if (!_session) {
			return await resolve(event)
		}
		event.locals.user = await currentAuthenticatedUser()
		console.log(_session.getIdToken().payload.email, 'is signed in at', event.url.pathname)
		return await resolve(event)
	}catch(err){
		return await resolve(event)
	}
};