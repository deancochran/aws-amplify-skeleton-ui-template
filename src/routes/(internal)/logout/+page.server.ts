import { redirect } from "@sveltejs/kit";
import { signOut } from "$lib/utils/auth";

export const load = async () => {
    await signOut();
    throw redirect(303, "/login");
};
