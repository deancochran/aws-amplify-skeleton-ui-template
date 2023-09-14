import { Auth } from 'aws-amplify';
import { user } from '$lib/stores/auth';

import type { Handle } from '@sveltejs/kit';
import { currentAuthenticatedUser, getCurrentSession } from '$lib/utils/auth';
// import { locale } from '$lib/stores/locale';

export const handle: Handle = async ({ event, resolve }) => {
	// Get the user data from Amplify.
	const session = await getCurrentSession();
	// If the session is not found
	if (!session) {
		return await resolve(event)
	}else{
		console.log(session.getIdToken().payload.email, 'is signined in at', event.url.pathname)
		// Set the user data in the event locals object.
		const user = await currentAuthenticatedUser();
		event.locals.user = JSON.parse(JSON.stringify(user))
		event.locals.session = session
		return await resolve(event)
	}
};