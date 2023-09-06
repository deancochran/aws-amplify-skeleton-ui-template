// See https://kit.svelte.dev/docs/types#app

import type { Locale } from "$lib/stores/locale";

// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			user: any
			locale: Locale
		  }
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
