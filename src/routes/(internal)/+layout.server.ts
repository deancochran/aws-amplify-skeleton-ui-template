import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from '../$types';

export const load: LayoutServerLoad = async ({ locals, parent }) => {
	const data = await parent();
	if (!locals.user) {
		throw redirect(303, '/');
	}
	return data
};
