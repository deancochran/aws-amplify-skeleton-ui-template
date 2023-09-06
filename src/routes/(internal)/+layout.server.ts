import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from '../$types';

// get `locals.user` and pass it to the `page` store
export const load: LayoutServerLoad = async ({ locals, parent }) => {
	// redirect user if not logged in
  await parent();
	if (!locals.user) {
		throw redirect(303, '/');
	}
};
