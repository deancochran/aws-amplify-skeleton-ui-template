import { signOut } from "$lib/utils/auth";
import { redirect } from "@sveltejs/kit";

export const load = async ({parent}) => {
    await signOut();
    const data = await parent();
    throw redirect(303, '/')
    return data
};
