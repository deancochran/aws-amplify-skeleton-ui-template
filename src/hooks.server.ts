import { Auth } from 'aws-amplify';
import { user } from '$lib/stores/auth';

import type { Handle } from '@sveltejs/kit';
import { getCurrentUser } from '$lib/utils/auth';
import { get } from 'svelte/store';
// import { locale } from '$lib/stores/locale';

export const handle: Handle = async ({ event, resolve }) => {
	// get cookies from browser
	const session = event.cookies.get('session');

	if (!session) {
		// if there is no session load page as normal
		return await resolve(event);
	}

	// find the user based on the session
	const cognitoUser = await getCurrentUser();

	// if `user` exists set `events.local`
	if (cognitoUser) {
		event.locals.user = cognitoUser;
	}
	// event.locals.locale = get(locale);

	// load page as normal
	return resolve(event, {
		// replace the `lang` attribute
		transformPageChunk: ({ html }) => html.replace('%lang%', event.locals.locale)
	});
};