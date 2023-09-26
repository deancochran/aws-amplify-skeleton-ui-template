import { signOut } from "$lib/utils/auth";
import { redirect } from "@sveltejs/kit";

export const load = async ({parent}) => {
    const data = await parent();
    await signOut();
    throw redirect(303, '/')
};
