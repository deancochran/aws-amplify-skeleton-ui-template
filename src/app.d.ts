// See https://kit.svelte.dev/docs/types#app

import type { Locale } from "$lib/stores/locale";
import type { CognitoSignInUserSession, CognitoUser } from "$lib/types/auth";

// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			session: any,
			user:CognitoUser
		  }
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
